const AttractionSite = require("../../server/models/tourist_attractionModel");

exports.getAllAttractionSites = async (req, res) => {
  try {
    const attractionSites = await AttractionSite.find();
    res.status(200).json(attractionSites);
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
  const { name, location, description, category, rating, hours, admission_price, image, nearby_restaurants, other_activities } = req.body;

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
      other_activities
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
  const { name, category, location } = req.query;

  try {
    const queryConditions = {};
    
    if (name) {
      queryConditions.name = { $regex: name.trim(), $options: "i" }; // Trimmed name
    }
    
    if (category) {
      queryConditions.category = { $regex: category.trim(), $options: "i" }; // Trimmed category
    }
    if (location) {
      queryConditions.location = { $regex: location.trim(), $options: "i" }; // Trimmed location
    }

    const attractionSites = await AttractionSite.find(queryConditions);

    res.status(200).json(attractionSites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
