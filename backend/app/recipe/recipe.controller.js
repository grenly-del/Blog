const { HTTP_STATUS_CODE } = require("../../constant/httpCode");
const { appRes } = require("../../utils/appRes");
const recipeService = require("./recipe.service");

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    appRes(res, HTTP_STATUS_CODE.OK, 'Berhasil mengambil resep!', recipes)
  } catch (err) {
    console.log(err)
    next(err)
  }
};

exports.getRecipeByUserId = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const recipe = await recipeService.getRecipeByUserId(userId);
    appRes(res, HTTP_STATUS_CODE.OK, 'Berhasil ambil data', recipe)
  } catch (err) {
    console.log(err)
    next(err)
  }
};

exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    appRes(res, HTTP_STATUS_CODE.OK, 'Berhasil ambil data', recipe)
  } catch (err) {
    console.log(err)
    next(err)
  }

}


exports.createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, instructions, cookingTime } = req.body;

    // Basic validation
    if (!name || !ingredients || !instructions || !cookingTime) {
      throw new Error("All fields are required")
    }

    const parsedIngredients = typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients;
    console.log(parsedIngredients)

    if (!Array.isArray(parsedIngredients)) {
      throw new Error("Ingredients must be an array")
    }

    if (parsedIngredients.some((item) => item.length > 40)) {
      throw new Error("Ingredients cannot exceed 40 characters each")
    }

    if (instructions.length > 200) {
      throw new Error("Instructions cannot exceed 200 characters")
    }

    const imageUrl = req.file?.path || req.file?.secure_url;
    const userId = req.user?.userId || userOwner;

    if (!userId) {
      throw new Error("User is not authenticated")
    }

    const newRecipe = await recipeService.createRecipe(
      { 
        name,
        ingredients: parsedIngredients,
        instructions,
        cookingTime,
        imageUrl,
      },
      userId,
      imageUrl
    );
    appRes(res, HTTP_STATUS_CODE.OK, 'Berhasil membuat resep!')
  } catch (err) {
    console.log(err)
    next(err)
  }
};



exports.updateRecipe = async (req, res, next) => {
  const newRecipeData = {
    ...req.body,
    imageUrl: req.file?.path || req.file?.secure_url,
  }
  try {
    console.log(req.body)
    const updated = await recipeService.updateRecipe(req.params.id, newRecipeData);
    appRes(res, HTTP_STATUS_CODE.OK, 'Berhasil mengubah', updated)
  } catch (err) {
    console.log(err)
    next(err)
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    await recipeService.deleteRecipe(req.params.id);
    console.log(req.params.id)
    appRes(res, HTTP_STATUS_CODE.OK, 'Berhasil menghapus!')
  } catch (err) {
    console.log(err)
    next(err)
  }
};


exports.getSavedRecipes = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const savedRecipes = await recipeService.getSavedRecipes(userId);
    appRes(res, HTTP_STATUS_CODE.OK, 'Berhasil', savedRecipes)
  } catch (err) {
    console.log(err)
    next(err)
  }
};
