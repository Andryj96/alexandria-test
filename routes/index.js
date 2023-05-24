const express = require('express');
const { Octokit } = require('octokit');

const router = express.Router();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});


router.get('/', (req, res, next) => {
  res.json({ message: 'Alexandria Tech Teste' });
});


module.exports = router;
