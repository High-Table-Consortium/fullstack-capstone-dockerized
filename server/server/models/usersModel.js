const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
    preferences: {
      type: [String],
      default: [],
    },
    searches: {
      type: [String],
      default: [],
    },
    recommendations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recommendation",
      },
    ],
    viewedAttractions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attraction",
      },
    ],
    favourites: [
      {
        attraction_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TouristAttraction",
          required: true,
        },
        attraction_name: {
          type: String,
          required: true,
        },
        attraction_image: {
          type: String,
          required: true,
        },
        attraction_rating: {
          type: Number,
          required: true,
        },
        attraction_location: {
          type: String,
          required: true,
        },
        attraction_category: {
          type: String,
          required: true,
        },
      },
    ],
    dateJoined: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
