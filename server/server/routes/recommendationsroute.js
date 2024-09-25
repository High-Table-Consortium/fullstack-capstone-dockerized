const express = require('express');
const router = express.Router();
const recommendationsController = require('../controllers/recommendations');

// GET all recommendations
router.get('/', recommendationsController.getRecommendations);

// GET a specific recommendation by ID
router.get('/:id', recommendationsController.getRecommendationById);

// CREATE a new recommendation
router.post('/', recommendationsController.createRecommendation);

// UPDATE a recommendation
router.patch('/:id', recommendationsController.updateRecommendation);

// DELETE a recommendation
router.delete('/:id', recommendationsController.deleteRecommendation);

module.exports = router;