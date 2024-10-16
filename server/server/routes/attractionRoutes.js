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
const { authenticateToken, isAdmin, verifyToken } = require('../middleware/authMiddleware');
router.get("/search", searchAttractionSites);
router.get("/", getAllAttractionSites);
router.post("/", verifyToken, isAdmin, createAttractionSite);
router.get("/:id", getAttractionSiteById);
router.put("/:id", verifyToken, isAdmin, updateAttractionSite);
router.delete("/:id", verifyToken, isAdmin, deleteAttractionSite);

module.exports = router;




