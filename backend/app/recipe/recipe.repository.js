const Recipe = require("./recipe.model");

exports.findAllRecipes = async () => {
  return await Recipe.find();
};

exports.createRecipe = async (recipeData) => {
  const newRecipe = new Recipe(recipeData);
  return await newRecipe.save();
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
