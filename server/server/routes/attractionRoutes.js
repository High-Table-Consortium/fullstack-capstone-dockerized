const express = require('express');
// const {
//     searchAttractions,
//     submitReview,
//     getRecommendations,
// } = require('../controllers/attractionController');
const { validateSearch, validateReview } = require('../validators/attractionValidator');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', validateSearch, async (req, res) => {
    try {
        const attractions = await searchAttractions(req.query);
        res.status(200).json(attractions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while searching for attractions.' });
    }
});

router.post('/:id/reviews', authMiddleware, validateReview, async (req, res) => {
    try {
        const review = await submitReview(req.params.id, req.body, req.user.id);
        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        if (error.message === 'Attraction not found') {
            return res.status(404).json({ message: 'Attraction not found.' });
        }
        res.status(500).json({ message: 'An error occurred while submitting the review.' });
    }
});

router.get('/recommendations', authMiddleware, async (req, res) => {
    try {
        const recommendations = await getRecommendations(req.user.id);
        res.status(200).json(recommendations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching recommendations.' });
    }
});

module.exports = router;
