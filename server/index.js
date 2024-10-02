const express = require("express");
const cors = require("cors");
const adminRoutes = require("./server/routes/adminRoutes");
require("dotenv").config();
const commentRoutes = require("./server/routes/commentRoutes");
const connectToMongo = require("./server/db/connection");
const attractionRoutes = require("./server/routes/attractionRoutes");
const recommendationsRoutes = require("./server/routes/recommendationsroute");
const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

app.use("/api/admin", adminRoutes);
app.use("/api/attractions", attractionRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/recommendations", recommendationsRoutes);
module.exports = app;
