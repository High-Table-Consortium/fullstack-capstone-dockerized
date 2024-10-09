const express = require("express");
const session = require('express-session')
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();
const commentRoutes = require("./routes/commentRoutes");
const connectToMongo = require("./db/connection");
const attractionRoutes = require("./routes/attractionRoutes");
const recommendationsRoutes = require("./routes/recommendationsroute");
const authenticationRoutes = require("./routes/authenticationRoutes");
const userRoutes = require('./routes/userRoutes')
const reviewRoutes = require("./routes/reviewRoutes");
const searchRoutes = require("./routes/searchRoutes");
const passport = require('passport')
require('./middleware/passportConfig')

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;
app.use(session({
  secret: process.env.EXPRESS_SESSION,
  resave: false,
  saveUninitialized: true
}))
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session({
  secret: process.env.EXPRESS_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // for development environment, set to true for production environment to enable secure cookies (https)
}))
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

app.use("/api/admin", adminRoutes);
app.use("/api/attractions", attractionRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/recommendations", recommendationsRoutes);
app.use("/api/auth", authenticationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/user", userRoutes);
app.use("/api/searchRoutes", searchRoutes);
module.exports = app;
