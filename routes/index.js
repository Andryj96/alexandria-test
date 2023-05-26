const express = require("express");
const moment = require("moment-timezone");
const { PrismaClient } = require("@prisma/client");
const { searchRepos } = require("../utils/github");
const { getOperationDetails, getUserTimeZone } = require("../utils/tools");

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Alexandria Tech Teste" });
});

// Search repos
router.get("/search", async (req, res, next) => {
  try {
    const repos = await searchRepos();
    await prisma.repository.createMany({
      data: repos,
    });

    res.json(repos);
  } catch (err) {
    next(err);
  }
});

// List All saved repos without pagination
router.get("/repos", async (req, res) => {
  const result = await prisma.repository.findMany();

  res.json(result);
});

// GET details from saved repo by ID
// Consider taking the repository details from those that were saved earlier
router.get("/repos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id))
    res.status(404).json({ message: "Repository not found." });

  const result = await prisma.repository.findUnique({
    where: { id },
  });

  if (!result) res.status(404).json({ message: "Repository not found." });
  else res.json(result);
});

/*
  Make a favorite repository
  consider saving data from both states when you bookmark and 
  when you uncheck a favorite repo, also 
  This according to what I interpret from the question
*/
router.put("/repos/:id/favorite", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { favorite } = req.body;

    if (favorite === undefined || typeof favorite !== "boolean")
      res.status(400).json({ message: "'favorite' muest be boolean." });

    if (!Number.isInteger(id))
      res.status(404).json({ message: "Repository not found." });

    // Gets the repository information from the database
    const repository = await prisma.repository.findUnique({
      where: { id },
    });

    if (!repository) {
      return res.status(404).json({ message: "Repository not found" });
    }

    // Otain datetime and IP
    const { datetime, ip } = getOperationDetails(req);

    // Save the favorite information crating or updating a Favorite record
    const inFavorite = await prisma.favorite.findFirst({
      where: { repositoryId: repository.id },
    });

    let favorited = null;

    if (inFavorite) {
      favorited = await prisma.favorite.update({
        where: { id: inFavorite.id },
        data: {
          datetime,
          favorite,
          last_ip: ip,
        },
      });
    } else {
      favorited = await prisma.favorite.create({
        data: {
          repositoryId: repository.id,
          datetime,
          favorite,
          last_ip: ip,
        },
      });
    }

    res.json({
      message: `Saved as${!favorite ? " not" : ""} favorite repo.`,
      details: favorited,
    });
  } catch (err) {
    next(err);
  }
});

// List favorite repositories
router.get("/favorites", async (req, res, next) => {
  try {
    // Obtain client Ip address
    const clientIP = req.ip;

    const timeZone = await getUserTimeZone(clientIP);

    // Find favorite repositories in DB
    const favorites = await prisma.favorite.findMany({
      where: {
        favorite: true,
      },
      include: {
        repository: true,
      },
    });

    // map results to influde user local time
    const formattedFavorites = favorites.map((favorite) => {
      const formattedDateTime = moment(favorite.datetime)
        .tz(timeZone || "UTC") // timezone from ip locate api
        .format("YYYY-MM-DD HH:mm:ss");

      return {
        ...favorite.repository,
        timeZone: timeZone || "UTC",
        favoritedAt: formattedDateTime,
      };
    });

    res.json(formattedFavorites);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
