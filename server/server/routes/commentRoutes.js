const express = require("express");
const router = express.Router();
const {
  createComment,
  getCommentsByAttractionSite,
  getCommentsByUser,
  deleteComment,
  updateComment,
} = require("../../server/controllers/commentController");

router.post("/", createComment);
router.get("/attraction/:attractionId", getCommentsByAttractionSite);
router.get("/user/:userId", getCommentsByUser);
router.delete("/:commentId", deleteComment);
router.put("/:commentId", updateComment);

module.exports = router;

