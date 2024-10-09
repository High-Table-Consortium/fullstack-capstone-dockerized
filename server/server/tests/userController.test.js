// const request = require("supertest");
// const app = require("../index");
// const User = require("../models/usersModel");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // Mock dependencies
// jest.mock("../models/usersModel");
// jest.mock("jsonwebtoken");

// describe("User Controller", () => {
//   let token;
//   let userId = "userId";

//   beforeEach(() => {
//     token = "sampleToken";
//     jwt.sign.mockReturnValue(token);
//     bcrypt.hash.mockResolvedValue("hashedPassword");
//     bcrypt.compare.mockResolvedValue(true);

//     // Mock findById to always return a user object
//     User.findById.mockResolvedValue({
//       _id: userId,
//       firstName: "John",
//       lastName: "Doe",
//       email: "john@example.com",
//       save: jest.fn().mockResolvedValue(true),
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("GET /profile", () => {
//     it("should return the user profile", async () => {
//       User.findById.mockResolvedValueOnce({
//         _id: userId,
//         firstName: "John",
//         lastName: "Doe",
//         email: "john@example.com",
//       });

//       const res = await request(app)
//         .get("/api/user/profile")
//         .set("Cookie", [`token=${token}`]);  // Set the token as a cookie

//       expect(res.statusCode).toBe(200);
//       expect(res.body.success).toBe(true);
//       expect(res.body.message).toBe("User profile retrieved successfully.");
//     });

//     it("should return 404 if the user is not found", async () => {
//       User.findById.mockResolvedValueOnce(null);

//       const res = await request(app)
//         .get("/api/user/profile")
//         .set("Cookie", [`token=${token}`]);  // Set the token as a cookie

//       expect(res.statusCode).toBe(404);
//       expect(res.body.success).toBe(false);
//       expect(res.body.message).toBe("User not found.");
//     });
//   });

//   describe("PUT /profile", () => {
//     it("should update the user profile successfully", async () => {
//       User.findById.mockResolvedValueOnce({
//         _id: userId,
//         email: "john@example.com",
//         save: jest.fn().mockResolvedValue(true),
//       });

//       const res = await request(app)
//         .put("/api/user/profile")
//         .set("Cookie", [`token=${token}`])  // Set the token as a cookie
//         .send({ email: "newemail@example.com", password: "newpassword123" });

//       expect(res.statusCode).toBe(200);
//       expect(res.body.success).toBe(true);
//       expect(res.body.message).toBe("User profile updated successfully.");
//     });

//     it("should return 404 if the user is not found", async () => {
//       User.findById.mockResolvedValueOnce(null);

//       const res = await request(app)
//         .put("/api/user/profile")
//         .set("Cookie", [`token=${token}`])  // Set the token as a cookie
//         .send({ email: "newemail@example.com", password: "newpassword123" });

//       expect(res.statusCode).toBe(404);
//       expect(res.body.success).toBe(false);
//       expect(res.body.message).toBe("User not found.");
//     });
//   });

//   describe("DELETE /profile", () => {
//     it("should delete the user account successfully", async () => {
//       User.findByIdAndDelete.mockResolvedValueOnce({ _id: userId });

//       const res = await request(app)
//         .delete("/api/user/profile")
//         .set("Cookie", [`token=${token}`]);  // Set the token as a cookie

//       expect(res.statusCode).toBe(200);
//       expect(res.body.success).toBe(true);
//       expect(res.body.message).toBe("User account deleted successfully.");
//     });

//     it("should return 404 if the user is not found", async () => {
//       User.findByIdAndDelete.mockResolvedValueOnce(null);

//       const res = await request(app)
//         .delete("/api/user/profile")
//         .set("Cookie", [`token=${token}`]);  // Set the token as a cookie

//       expect(res.statusCode).toBe(404);
//       expect(res.body.success).toBe(false);
//       expect(res.body.message).toBe("User not found.");
//     });
//   });
// });
