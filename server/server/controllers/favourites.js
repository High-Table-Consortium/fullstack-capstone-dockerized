const Favourite = require("../models/tourist_attractionModel"); 
const User = require("../models/userModel");

// GET all favourites
exports.getFavourites = async (req, res) => {
  try {
    // Fetch all favourites and populate the 'attraction_id' field
    const favourites = await Favourite.find().populate(
      "attraction_id"
    ); // Populate the 'attraction_id' field
    res.json(favourites);
  } catch (err) {
    // Handle any errors that occur during the fetch
    res.status(500).json({ message: err.message });
  }
};

// GET a specific favourite by ID
exports.getFavouriteById = async (req, res) => {
  // Return the favourite fetched by the middleware
  res.json(res.favourite);
};

// CREATE a new favourite
exports.createFavourite = async (req, res) => {
  // Create a new favourite instance with the provided data
  const favourite = new Favourite({
    attraction_id: req.body.attraction_id,
    user_id: req.user._id
  });

  try {
    // Save the new favourite to the database
    const newFavourite = await favourite.save();
    res.status(201).json(newFavourite);
  } catch (err) {
    // Handle any errors that occur during the save
    res.status(400).json({ message: err.message });
  }
};

// UPDATE a favourite
exports.updateFavourite = async (req, res) => {
  // Update the favourite fields if they are provided in the request body
  if (req.body.attraction_id != null) {
    res.favourite.attraction_id = req.body.attraction_id;
  }
  if (req.body.user_id != null) {
    res.favourite.user_id = req.body.user_id;
  }

  try {
    // Save the updated favourite to the database
    const updatedFavourite = await res.favourite.save();
    res.json(updatedFavourite);
  } catch (err) {
    // Handle any errors that occur during the save
    res.status(400).json({ message: "favourite could not be save,try again!"});
  }
};

// DELETE a favourite
exports.deleteFavourite = async (req, res) => {
    try {
      // Remove the favourite from the database
      await res.favourite.remove();
      res.json({ message: "Favourite deleted" });
    } catch (err) {
      // Handle any errors that occur during the delete
      res.status(500).json({ message: err.message });
    }
  };