const request = require("supertest");
const { PrismaClient } = require("@prisma/client");
const app = require("../app");

const prisma = new PrismaClient();

describe("Integration tests", () => {
  beforeAll(async () => {
    await prisma.repository.create({
      data: {
        id: 141,
        guithubId: 3123,
        name: "Repo Test",
        fullName: "Full Repo test",
        owner: "test",
        description: "test",
        language: "test",
        stargazersCount: 34213,
        htmlUrl: "test",
        createdAt: "2023-02-27T13:27:41.000Z",
        updatedAt: "2023-02-27T13:27:41.000Z",
      },
    });
  });

  afterAll(async () => {
    const deleteFavorites = prisma.favorite.deleteMany();
    const deleteRepositories = prisma.repository.deleteMany();

    await prisma.$transaction([deleteFavorites, deleteRepositories]);

    await prisma.$disconnect();
  });

  it("should search and return repository data", async () => {
    const response = await request(app).get("/search");

    expect(response.status).toBe(200);

    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("fullName");
    expect(response.body[0]).toHaveProperty("description");
  });

  it("should set one repo as favorite", async () => {
    const response = await request(app)
      .put("/repos/141/favorite/")
      .send({ favorite: true });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("message");
    expect(response.body.details.repositoryId).toBe(141);
    expect(response.body.details.favorite).toBe(true);
  });

  it("should return 400 when validate input", async () => {
    const response = await request(app)
      .put("/repos/141/favorite/")
      .send({ favorite: "asdas" });

    expect(response.status).toBe(400);
  });

  it("should list favorite repos", async () => {
    const response = await request(app).get("/favorites");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
