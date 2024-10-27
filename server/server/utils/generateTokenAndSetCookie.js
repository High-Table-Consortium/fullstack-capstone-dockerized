const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

const generateAdminTokenAndSetCookie = (res, adminId) => {
  // Define payload with adminId and admin flag
  const payload = {
    adminId,
    isAdmin: true,
  };

  // Generate the token with payload
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set the token in a secure, HttpOnly cookie
  res.cookie("adminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

module.exports = { generateTokenAndSetCookie, generateAdminTokenAndSetCookie };