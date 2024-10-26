const AttractionSite = require("../models/tourist_attractionModel");

exports.getAllAttractionSites = async (req, res) => {
  const { sortBy, preferences } = req.query;

  try {
    // Fetch all attractions from the database
    let attractionSites = await AttractionSite.find();

    // If no sorting or preferences are specified, return all attraction sites
    if (!sortBy && !preferences) {
      return res.status(200).json(attractionSites);
    }

    // Apply dynamic scoring for sorting based on preferences
    if (preferences) {
      const preferredCategories = preferences.split(',').map(pref => pref.trim());

      // Apply dynamic scoring and sorting
      attractionSites = attractionSites.map((site) => {
        let score = 0;

        // 1. Rating Scoring
        if (site.rating) {
          score += site.rating * 20; // Adjust the weight as needed
        }

        // 2. Preference Scoring
        if (preferredCategories.includes(site.category)) {
          score += 50; // Boost score for matching category
        }

        // 3. Nearby Restaurants Scoring
        if (site.nearby_restaurants && site.nearby_restaurants.length > 0) {
          const restaurantRatings = site.nearby_restaurants.map(r => r.rating);
          const averageRestaurantRating = restaurantRatings.reduce((a, b) => a + b, 0) / restaurantRatings.length;
          score += averageRestaurantRating * 10;
        }

        // Attach the score to each site for sorting purposes
        return { site, score };
      });

      // Sorting by specified parameter
      if (sortBy === 'popularity') {
        attractionSites.sort((a, b) => b.site.visits - a.site.visits); // Sort by visits
      } else if (sortBy === 'rating') {
        attractionSites.sort((a, b) => b.site.rating - a.site.rating); // Sort by rating
      } else {
        // Default: Sort by calculated score
        attractionSites.sort((a, b) => b.score - a.score);
      }
    }

    // Return both site data and scores
    const response = attractionSites.map(({ site, score }) => ({
      ...site.toObject(),
      score, // Include the score
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getAttractionSiteById = async (req, res) => {
  const { id } = req.params;
  try {
    const attractionSite = await AttractionSite.findById(id);
    if (!attractionSite) {
      return res.status(404).json({ message: "Attraction site not found." });
    }

    res.status(200).json(attractionSite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAttractionSite = async (req, res) => {
  const { name, location, description, category, rating, hours, admission_price, image, nearby_restaurants, other_activities, gallery } = req.body;

  try {
    const newAttractionSite = new AttractionSite({
      name,
      location,
      description,
      category,
      rating,
      hours,
      admission_price,
      image,
      nearby_restaurants,
      other_activities,
      gallery
    });

    await newAttractionSite.save();

    res.status(201).json(newAttractionSite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAttractionSite = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAttractionSite = await AttractionSite.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAttractionSite) {
      return res.status(404).json({ message: "Attraction site not found." });
    }

    res.status(200).json(updatedAttractionSite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAttractionSite = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAttractionSite = await AttractionSite.findByIdAndDelete(id);
    if (!deletedAttractionSite) {
      return res.status(404).json({ message: "Attraction site not found." });
    }

    res.status(200).json({ message: "Attraction site deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchAttractionSites = async (req, res) => {
  const { searchTerm = '', sortBy = '', category = '', location = '' } = req.query;

  try {
    const queryConditions = {};

    // Apply full-text search if a search term is provided
    if (searchTerm) {
      queryConditions.$text = { $search: searchTerm };
    }

    // Apply additional filters if provided in the query parameters
    if (category) {
      queryConditions.category = { $regex: category, $options: 'i' };
    }
    if (location) {
      queryConditions.location = { $regex: location, $options: 'i' };
    }

    // Initialize the query with conditions
    let query = AttractionSite.find(queryConditions);

    // Apply sorting based on sortBy parameter
    if (sortBy === 'popularity') {
      query = query.sort({ visits: -1 });
    } else if (sortBy === 'rating') {
      query = query.sort({ rating: -1 });
    }

    // Execute the query and get results
    const results = await query;
    
    // Send results as JSON response
    res.status(200).json(results);
  } catch (error) {
    console.error('Error querying attraction sites:', error);
    res.status(500).json({ message: 'An error occurred while retrieving attraction sites.' });
  }
};
