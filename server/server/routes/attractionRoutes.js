const express = require("express");
const router = express.Router();
const {
  getAllAttractionSites,
  getAttractionSiteById,
  createAttractionSite,
  updateAttractionSite,
  deleteAttractionSite,
  searchAttractionSites,
} = require("../controllers/attractionSiteController");
const { authenticateToken, isAdmin, verifyToken, authenticateSession } = require('../middleware/authMiddleware');
router.get("/search", searchAttractionSites);
router.get("/", getAllAttractionSites);
router.post("/", authenticateSession, isAdmin, createAttractionSite);
router.get("/:id", getAttractionSiteById);
router.put("/:id", authenticateSession, isAdmin, updateAttractionSite);
router.delete("/:id", authenticateSession, isAdmin, deleteAttractionSite);

module.exports = router;




