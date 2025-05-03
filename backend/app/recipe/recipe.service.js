const recipeRepository = require("./recipe.repository");
const userRepository = require("../users/user.repository");
const cloudinary = require("../../config/cloudinary.config");
const fs = require("fs");

const getAllRecipes = async () => {
  return await recipeRepository.findAllRecipes();
};

const createRecipe = async (recipeData, userId, imagePath) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  let imageUrl = "";
  if (imagePath) {
    imageUrl = await uploadImageToCloudinary(imagePath);
  }

  const newRecipe = {
    ...recipeData,
    userOwner: userId,
    imageUrl,
  };

  return await recipeRepository.createRecipe(newRecipe);
};

const getRecipeById = async (id) => {
  const recipe = await recipeRepository.findRecipeById(id);
  if (!recipe) throw new Error("Recipe not found");
  return recipe;
};

const updateRecipe = async (id, data) => {
  const recipe = await recipeRepository.findRecipeById(id);
  if (!recipe) throw new Error("Recipe not found");
  return await recipeRepository.updateRecipe(id, data);
};

const deleteRecipe = async (id) => {
  const recipe = await recipeRepository.findRecipeById(id);
  if (!recipe) throw new Error("Recipe not found");
  return await recipeRepository.deleteRecipe(id);
};

const saveRecipe = async (id, userId) => {
  const recipe = await recipeRepository.findRecipeById(id);
  if (!recipe) throw new Error("Recipe not found");

  const user = await userRepository.findUserById(userId);
  if (!user) throw new Error("User not found");

  if (!user.savedRecipes.includes(id)) {
    user.savedRecipes.push(id);
    await user.save();
  }

  return recipe;
};

const getSavedRecipes = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw new Error("User not found");

  const savedRecipes = await recipeRepository.findRecipesByIds(user.savedRecipes);
  return savedRecipes;
};

const uploadImageToCloudinary = async (imagePath) => {
  try {
    if (!fs.existsSync(imagePath)) {
      throw new Error("Image file does not exist");
    }

    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
      folder: "recipes",
    });

    return result.secure_url;
  } catch (err) {
    throw new Error("Error uploading image to Cloudinary: " + err.message);
  }
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  saveRecipe,
  getSavedRecipes,
  uploadImageToCloudinary,
};
