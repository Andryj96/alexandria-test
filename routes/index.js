const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { searchRepos } = require("../utils/github");
const getOperationDetails = require("../utils/tools");

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Alexandria Tech Teste" });
});

// Search repos
router.get("/search", async (req, res, next) => {
  try {
    const repos = await searchRepos();
    result = await prisma.repository.createMany({
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
  const result = await prisma.repository.findUnique({
    where: { id: parseInt(req.params.id) },
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
    const { id } = req.params;
    const { favorite } = req.body;

    // Gets the repository information from the database
    const repository = await prisma.repository.findUnique({
      where: { id: parseInt(id) },
    });

    if (!repository) {
      return res.status(404).json({ message: "Repository not found" });
    }

    // Otain datetime and IP
    const { datetime, ip } = getOperationDetails(req);

    // Save the favorite information crating or updating a Favorite record
    const isFavorite = await prisma.favorite.findFirst({
      where: { repositoryId: repository.id },
    });

    let favorited = null;

    if (isFavorite) {
      favorited = await prisma.favorite.update({
        where: { id: repository.id },
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
      message: "Saved as favorite repo.",
      details: favorited,
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
