const Favourites = require("../models/favourites");
const User = require("../models/usersModel");
const TouristAttraction = require("../models/tourist_attractionModel");
const Favourite = require("../models/favourites");

exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.find({ user_id: req.body.user_id }).populate("attraction_id");
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET a specific favourite by ID
exports.getFavouriteById = async (req, res) => {
  res.json(res.favourite);
};

exports.createFavourite = async (req, res) => {
  const { attraction_id, user_id } = req.body;

  try {
    // Check if the favourite already exists
    const existingFavourite = await Favourite.findOne({ user_id, attraction_id });
    if (existingFavourite) {
      return res.status(400).json({ message: "Attraction is already in favourites." });
    }

    // Find the attraction data
    const attraction = await TouristAttraction.findById(attraction_id);
    if (!attraction) {
      return res.status(404).json({ message: "Attraction not found." });
    }

    // Create a new favourite
    const newFavourite = new Favourite({
      user_id,
      attraction_id,
    });

    // Save the favourite
    const savedFavourite = await newFavourite.save();

    // Update the user document with the favourite ID and attraction data
    await User.findByIdAndUpdate(user_id, {
      $push: {
        favourites: {
          attraction_id: attraction_id,
          attraction_name: attraction.name,
          attraction_image: attraction.image,
          attraction_location: attraction.location,
          attraction_rating: attraction.rating,
          attraction_category: attraction.category,
        },
      },
    });

    res.status(201).json(savedFavourite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a favourite
exports.updateFavourite = async (req, res) => {
  if (req.body.attraction_id != null) {
    res.favourite.attraction_id = req.body.attraction_id;
  }
  if (req.body.user_id != null) {
    res.favourite.user_id = req.body.user_id;
  }

  try {
    const updatedFavourite = await res.favourite.save();
    res.json(updatedFavourite);
  } catch (err) {
    res.status(400).json({ message: "Favourite could not be saved, try again!" });
  }
};

// DELETE a favourite using body request
exports.removeFavourite = async (req, res) => {
  const { user_id, favourite_id } = req.body; // Expect user_id and favourite_id in the request body

  try {
    console.log(`Attempting to delete favourite with id: ${favourite_id} for user: ${user_id}`);
    
    // Find the user and remove the favorite from their favourites array
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { $pull: { favourites: { _id: favourite_id } } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.log(`User not found: ${user_id}`);
      return res.status(404).json({ message: "User not found." });
    }

    // Remove the favourite from the Favourites collection
    await Favourite.findByIdAndDelete(favourite_id);

    console.log(`Favourite with id: ${favourite_id} deleted successfully for user: ${user_id}`);
    res.json({ message: "Favourite deleted successfully", favourite_id });
  } catch (err) {
    console.error('Error deleting favourite:', err);
    res.status(500).json({ message: "Error deleting favourite, please try again." });
  }
};
