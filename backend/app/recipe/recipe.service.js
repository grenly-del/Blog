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

const getRecipeByUserId = async (id) => {
  const recipe = await recipeRepository.findRecipeByUserId(id);
  if (!recipe) throw new Error("Recipe not found");
  return recipe;
};

const getRecipeById = async (id) => {
  const recipe = await recipeRepository.findRecipeById(id);
  if (!recipe) throw new Error("Recipe not found");
  return recipe;
};

const updateRecipe = async (id, data) => {
  const recipe = await recipeRepository.findRecipeById(id);
  if (!recipe) throw new Error("Recipe not found");
  console.log(data);
  if (data.imageUrl) {
    const imageUrl = await uploadImageToCloudinary(data.imageUrl);
    data.imageUrl = imageUrl;
  }

  return await recipeRepository.updateRecipe(id, data);
};

const deleteRecipe = async (id) => {
  const recipe = await recipeRepository.findRecipeById(id);
  if (!recipe) throw new Error("Recipe not found");
  return await recipeRepository.deleteRecipe(id);
};

const uploadImageToCloudinary = async (imagePath) => {
  try {
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
  getRecipeByUserId,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImageToCloudinary,
};
