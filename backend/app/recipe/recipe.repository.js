const Recipe = require("./recipe.model");
const { ObjectId } = require("mongoose");

exports.findAllRecipes = async () => {
  return await Recipe.find()
    .populate("userOwner", "-__v -password")
    .select("-__v");
};

exports.createRecipe = async (recipeData) => {
  const newRecipe = new Recipe(recipeData);
  return await newRecipe.save();
};

exports.findRecipeByUserId = async (id) => {
  return await Recipe.find({ userOwner: id }).populate('userOwner').select("-__v");
};

exports.findRecipeById = async (id) => {
  return await Recipe.findById(id);
};

exports.updateRecipe = async (id, data) => {
  return await Recipe.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteRecipe = async (id) => {
  return await Recipe.findByIdAndDelete(id);
};
