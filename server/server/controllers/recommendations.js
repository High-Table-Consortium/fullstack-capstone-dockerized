const express = require('express');
const router = express.Router();
const Recommendation = require('../models/recommendationModel'); 



// GET all recommendations
async function getRecommendations(req, res) {
  try {
    const recommendations = await Recommendation.find();
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET a specific recommendation by ID
async function getRecommendationById(req, res) {
  try {
    const recommendation = await Recommendation.findById(req.params.id);
    if (recommendation == null) {
      return res.status(404).json({ message: 'Cannot find recommendation' });
    }
    res.json(recommendation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// CREATE a new recommendation
async function createRecommendation(req, res) {
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
}

// UPDATE a recommendation
async function updateRecommendation(req, res) {
  try {
    const recommendation = await Recommendation.findById(req.params.id);
    if (recommendation == null) {
      return res.status(404).json({ message: 'Cannot find recommendation' });
    }

    if (req.body.attraction_id != null) {
      recommendation.attraction_id = req.body.attraction_id;
    }
    if (req.body.name != null) {
      recommendation.name = req.body.name;
    }

    const updatedRecommendation = await recommendation.save();
    res.json(updatedRecommendation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// DELETE a recommendation
async function deleteRecommendation(req, res) {
  try {
    const recommendation = await Recommendation.findById(req.params.id);
    if (recommendation == null) {
      return res.status(404).json({ message: 'Cannot find recommendation' });
    }

    await recommendation.remove();
    res.json({ message: 'Recommendation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getRecommendations,
  getRecommendationById,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
};
