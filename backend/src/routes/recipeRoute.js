const express=require("express");
const router=express.Router();
const {isLoggedIn}=require("../middlewares/isLoggedIn");

const {getAllRecipes, createRecipe, getRecipeById, saveRecipes, getSavedRecipeById, getSavedRecipes, deleteRecipe, updateRecipe }=require("../controller/recipeController.js");


router.route("/all").get(isLoggedIn, getAllRecipes);
router.route("/create").post(isLoggedIn, createRecipe);
router.route("/:recipeId").get(isLoggedIn, getRecipeById);
router.route("/save").put(isLoggedIn, saveRecipes); 
router.route("/savedRecipes/ids/:userId").get(isLoggedIn, getSavedRecipeById); 
router.route("/savedRecipes/:userId").get(isLoggedIn, getSavedRecipes); 
router.route("/delete/:recipeId").delete(isLoggedIn, deleteRecipe);
router.route("/update/:recipeId").put(isLoggedIn, updateRecipe);


module.exports =router;
