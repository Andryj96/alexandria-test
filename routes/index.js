const express = require('express');
const { Octokit } = require('octokit');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const router = express.Router();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});


router.get('/', (req, res, next) => {
  res.json({ message: 'Alexandria Tech Teste' });
});

router.get(`/repos`, async (_req, res) => {
  const result = await prisma.repository.findMany()
  res.json(result)
})

module.exports = router;
