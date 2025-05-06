const mongoose = require("mongoose");
const validator = require("validator");

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a recipe name"],
    maxlength: [20, "Recipe name cannot be more than 20 characters"]
  },
  ingredients: [
    {
      type: String,
      required: [true, "Please enter ingredients"],
      maxlength: [50, "Ingredients cannot be more than 40 characters"]
    }
  ],
  instructions: {
    type: String,
    required: [true, "Please enter instructions"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please enter image URL"],
    validate: [validator.isURL, "Please enter a valid URL"]
  },
  cookingTime: {
    type: Number,
    required: [true, "Please enter cooking time"],
    min: [1, "Cooking time cannot be less than 1 minute"]
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Recipes", recipeSchema);
