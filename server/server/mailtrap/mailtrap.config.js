// nodemailer.config.js
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: process.env.MAILTRAP_PORT, // Typically 2525
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sender = {
  email: "hello@meeguide.com",
  name: "Auth Company",
};

module.exports = { transporter, sender };
