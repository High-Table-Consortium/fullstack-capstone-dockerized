const express = require('express');
const router = express.Router();
const {getRecommendations,getRecommendationById,createRecommendation,updateRecommendation,deleteRecommendation} = require('../../server/controllers/recommendations');

// GET all recommendations
router.get('/', getRecommendations);

// GET a specific recommendation by ID
router.get('/:id', getRecommendationById);

// CREATE a new recommendation
router.post('/', createRecommendation);

// UPDATE a recommendation
router.patch('/:id', updateRecommendation);

// DELETE a recommendation
router.delete('/:id', deleteRecommendation);

module.exports = router;