const express = require('express');
const router = express.Router();
const Recommendation = require('../models/recommendationModel'); // Assuming your model is in a 'models' folder

// GET all recommendations
router.get('/', async (req, res) => {
  try {
    const recommendations = await Recommendation.find().populate('attraction_id'); // Populate the 'attraction_id' field
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific recommendation by ID
router.get('/:id', getRecommendation, (req, res) => {
  res.json(res.recommendation);
});

// CREATE a new recommendation
router.post('/', async (req, res) => {
  const recommendation = new Recommendation({
    attraction_id: req.body.attraction_id,
    name: req.body.name,
  });

  try {
    const newRecommendation = await recommendation.save();
    res.status(201).json(newRecommendation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a recommendation
router.patch('/:id', getRecommendation, async (req, res) => {
  if (req.body.attraction_id != null) {
    res.recommendation.attraction_id = req.body.attraction_id;
  }
  if (req.body.name != null) {
    res.recommendation.name = req.body.name;
  }

  try {
    const updatedRecommendation = await res.recommendation.save();
    res.json(updatedRecommendation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a recommendation
router.delete('/:id', getRecommendation, async (req, res) => {
  try {
    await res.recommendation.remove();
    res.json({ message: 'Recommendation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a recommendation by ID
async function getRecommendation(req, res, next) {
  let recommendation;
  try {
    recommendation = await Recommendation.findById(req.params.id);
    if (recommendation == null) {
      return res.status(404).json({ message: 'Cannot find recommendation' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.recommendation = recommendation;
  next();
}

module.exports = router;
