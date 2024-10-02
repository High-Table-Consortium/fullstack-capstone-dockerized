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
router.get("/search", searchAttractionSites);
router.get("/", getAllAttractionSites);
router.post("/", createAttractionSite);
router.get("/:id", getAttractionSiteById);
router.put("/:id", updateAttractionSite);
router.delete("/:id", deleteAttractionSite);

module.exports = router;




