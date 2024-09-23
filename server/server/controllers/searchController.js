const express = require('express');
const router = express.Router();


router.get('/api/search', (req, res) => {
    const { q, type } = req.query;
  
    if (!q) {
      return res.status(400).json({ error: 'Search query (q) is required' });
    }
  
    let results = attractions.filter(item => 
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.location.toLowerCase().includes(q.toLowerCase()) ||
      item.category.toLowerCase().includes(q.toLowerCase())
    );
  
    if (type) {
      results = results.filter(item => item.type.toLowerCase() === type.toLowerCase());
    }
  
    res.json(results);
  });
  
  module.exports = router;