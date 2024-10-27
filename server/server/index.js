const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session); // Use connect-mongodb-session
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();
const commentRoutes = require("./routes/commentRoutes");
const connectToMongo = require("./db/connection");
const attractionRoutes = require("./routes/attractionRoutes");
const recommendationsRoutes = require("./routes/recommendationsroute");
const authenticationRoutes = require("./routes/authenticationRoutes");
const userRoutes = require("./routes/userRoutes");
const searchRoutes = require("./routes/searchRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const favourites = require("./routes/favourites");
const passport = require("passport");
require("./middleware/passportConfig");

const app = express();
app.use(cookieParser());
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

const { MONGODB_ATLAS_USER, MONGODB_ATLAS_PASSWORD, MONGODB_ATLAS_DATABASE } =
  process.env;

// MongoDB Atlas connection string with dynamic user, password, and database
const url = `mongodb+srv://${MONGODB_ATLAS_USER}:${MONGODB_ATLAS_PASSWORD}@cluster0.4mlkv.mongodb.net/${MONGODB_ATLAS_DATABASE}?retryWrites=true&w=majority`;

// Configure MongoDB session store
const store = new MongoDBStore({
  uri: url,
  collection: "sessions",
  expires: 7 * 24 * 60 * 60 * 1000, // Expiry time for session data
});

store.on("error", (error) => {
  console.error("Session store error:", error);
});
// Session configuration
app.use(
  session({
    secret: process.env.EXPRESS_SESSION,
    resave: false,
    saveUninitialized: false, // Prevents empty sessions from being saved
    store: store,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

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
app.use("/api/favourites", favourites);
module.exports = app;
