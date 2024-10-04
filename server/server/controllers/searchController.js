const express = require('express');
const router = express.Router();
const { Attraction } = require('../models/tourist_attractionModel');

exports.searchAttractionSites =async(req, res) => {
  const { q, type } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Search query (q) is required' });
  }

  if (typeof q !== 'string') {
    return res.status(400).json({ error: 'Search query (q) must be a string' });
  }

  if (type && typeof type !== 'string') {
    return res.status(400).json({ error: 'Type must be a string' });
  }

  try {
    const query = {
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { rating: { $regex: q, $options: 'i' } },
        
      ],
    };

    if (type) {
      query.type = type.toLowerCase();
    }

    const results = await Attraction.find().limit(100); // Add pagination or limit results

    res.json(results);
  } catch (error) {
    console.error('Error searching attractions:', error);
    res.status(500).json({ error: 'Error searching attractions' });
  }
};

