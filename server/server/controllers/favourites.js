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
  // Return the favourite fetched by the middleware
  res.json(res.favourite);
};

exports.createFavourite = async (req, res) => {
  const { attraction_id } = req.body;
  const user_id = req.body.user_id;

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
    res.status(400).json({ message: "favourite could not be save,try again!" });
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
    res.status(500).json({ message: "fav not deleted try again" });
  }
};