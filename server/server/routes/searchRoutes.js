const express = require('express');
const router = express.Router();
const { searchAttractionSites } = require('../controllers/searchController');

router.get('/search', searchAttractionSites);

module.exports = router;