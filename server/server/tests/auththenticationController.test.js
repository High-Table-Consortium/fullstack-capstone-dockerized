const request = require("supertest");
const app = require("../index"); // Assuming you have an app.js or server.js exporting your Express app
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

jest.mock("../models/usersModel");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("User Controller", () => {
  let token;

  beforeEach(() => {
    token = "sampleToken";
    jwt.sign.mockReturnValue(token);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    bcrypt.compare.mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /register", () => {
    it("should register a new user successfully", async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save.mockResolvedValue({ _id: "userId" });

      const res = await request(app).post("/api/auth/register").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("User registered successfully.");
      expect(res.body.data).toHaveProperty("token");
    });

    it("should return 400 if the user already exists", async () => {
      User.findOne.mockResolvedValue({ _id: "userId" });

      const res = await request(app).post("/api/auth/register").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("User already exists.");
    });
  });

  describe("POST /login", () => {
    it("should log in the user successfully", async () => {
      User.findOne.mockResolvedValue({
        _id: "userId",
        email: "john@example.com",
        password: "hashedPassword",
      });

      const res = await request(app).post("/api/auth/login").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Login successful.");
      expect(res.body.data).toHaveProperty("token");
    });

    it("should return 400 if the user is not found", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).post("/api/auth/login").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("User not found.");
    });

    it("should return 400 if the password is incorrect", async () => {
      User.findOne.mockResolvedValue({
        _id: "userId",
        email: "john@example.com",
        password: "hashedPassword",
      });
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app).post("/api/auth/login").send({
        email: "john@example.com",
        password: "wrongPassword",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Invalid email or password.");
    });
  });
});
