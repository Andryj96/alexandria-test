const request = require("supertest");
const app = require("../app");

describe("Simple tests", () => {
  it("should return a welcome message at the root route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Alexandria Tech Teste");
  });

  it("should return an Array", async () => {
    const response = await request(app).get("/repos");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return an Array", async () => {
    const response = await request(app).get("/favorites");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
