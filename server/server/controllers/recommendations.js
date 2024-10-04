const Recommendation = require("../models/recommendationModel"); 

// GET all recommendations
exports.getRecommendations = async (req, res) => {
  try {
    // Fetch all recommendations and populate the 'attraction_id' field
    const recommendations = await Recommendation.find().populate(
      "attraction_id"
    ); // Populate the 'attraction_id' field
    res.json(recommendations);
  } catch (err) {
    // Handle any errors that occur during the fetch
    res.status(500).json({ message: err.message });
  }
};

// GET a specific recommendation by ID
exports.getRecommendationById = async (req, res) => {
  // Return the recommendation fetched by the middleware
  res.json(res.recommendation);
};

// CREATE a new recommendation
exports.createRecommendation = async (req, res) => {
  // Create a new recommendation instance with the provided data
  const recommendation = new Recommendation({
    attraction_id: req.body.attraction_id,
    name: req.body.name,
  });

  try {
    // Save the new recommendation to the database
    const newRecommendation = await recommendation.save();
    res.status(201).json(newRecommendation);
  } catch (err) {
    // Handle any errors that occur during the save
    res.status(400).json({ message: err.message });
  }
};

// UPDATE a recommendation
exports.updateRecommendation = async (req, res) => {
  // Update the recommendation fields if they are provided in the request body
  if (req.body.attraction_id != null) {
    res.recommendation.attraction_id = req.body.attraction_id;
  }
  if (req.body.name != null) {
    res.recommendation.name = req.body.name;
  }

  try {
    // Save the updated recommendation to the database
    const updatedRecommendation = await res.recommendation.save();
    res.json(updatedRecommendation);
  } catch (err) {
    // Handle any errors that occur during the save
    res.status(400).json({ message: err.message });
  }
};

// DELETE a recommendation
exports.deleteRecommendation = async (req, res) => {
  try {
    // Remove the recommendation from the database
    await res.recommendation.remove();
    res.json({ message: "Recommendation deleted" });
  } catch (err) {
    // Handle any errors that occur during the delete
    res.status(500).json({ message: err.message });
  }
};

// Middleware function to get a recommendation by ID
exports.getRecommendationMiddleware = async (req, res, next) => {
  let recommendation;
  try {
    // Fetch the recommendation by ID from the database
    recommendation = await Recommendation.findById(req.params.id);
    if (recommendation == null) {
      // Return a 404 error if the recommendation is not found
      return res.status(404).json({ message: "Cannot find recommendation" });
    }
  } catch (err) {
    // Handle any errors that occur during the fetch
    return res.status(500).json({ message: err.message });
  }

  // Attach the fetched recommendation to the response object
  res.recommendation = recommendation;
  next();
}