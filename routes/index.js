const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { searchRepos } = require("../utils/github");

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Alexandria Tech Teste" });
});

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

router.get("/repos", async (_req, res) => {
  const result = await prisma.repository.findMany();

  res.json(result);
});

module.exports = router;
