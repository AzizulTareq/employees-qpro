const request = require("supertest");
const app = require("../index"); // Ensure your app export the express app

describe("GET /api/employees/:id", () => {
  let token;

  beforeAll(async () => {
    // Obtain JWT token
    const response = await request(app)
      .post("/api/login")
      .send({ username: "admin", password: "password" });
    token = response.body.accessToken;
  });

  test("should return employee hierarchy", async () => {
    const response = await request(app)
      .get("/api/employees/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
