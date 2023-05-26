const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Optional
});

module.exports = {
  searchRepos: async () => {
    const languages = ["javascript", "python", "java", "ruby", "go"];

    try {
      // Get all repos in a parallel promise, also may be for off

      const repos = await Promise.all(
        languages.map((lang) =>
          octokit.request("GET /search/repositories", {
            q: `language:${lang}`,
            sort: "stars",
            order: "desc",
            per_page: 2,
            page: 1,
            headers: {
              "x-github-api-version": "2022-11-28",
            },
          })
        )
      );

      // Group repos and flat join
      const response = repos.map((repo) => repo.data.items).flat();

      const repoList = response.map((repo) => {
        return {
          guithubId: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          owner: repo.owner?.login,
          description: repo.description,
          language: repo.language,
          stargazersCount: repo.stargazers_count,
          htmlUrl: repo.html_url,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
        };
      });

      return repoList;
    } catch (err) {
      throw new Error(err);
    }
  },
};
