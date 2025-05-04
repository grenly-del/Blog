const recipeService = require("./recipe.service");

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    return res.json({ success: true, data: recipes });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    return res.json({ success: true, data: recipe });
  } catch (err) {
    return res.status(404).json({ success: false, message: err.message });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions, cookingTime } = req.body;

    // Basic validation
    if (!name || !ingredients || !instructions || !cookingTime) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const parsedIngredients = typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients;

    if (!Array.isArray(parsedIngredients)) {
      return res.status(400).json({ success: false, message: "Ingredients must be an array" });
    }

    if (parsedIngredients.some((item) => item.length > 40)) {
      return res.status(400).json({ success: false, message: "Ingredients cannot exceed 40 characters each" });
    }

    if (instructions.length > 200) {
      return res.status(400).json({ success: false, message: "Instructions cannot exceed 200 characters" });
    }

    const imageUrl = req.file?.path; // Cloudinary path
    const userId = req.user?.userId || userOwner;
    console.log("User ID:", userId); // Debugging line
    console.log("Image URL:", imageUrl); // Debugging line

    if (!userId) {
      return res.status(400).json({ success: false, message: "User is not authenticated" });
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

    return res.status(201).json({ success: true, data: newRecipe });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const updated = await recipeService.updateRecipe(req.params.id, req.body);
    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await recipeService.deleteRecipe(req.params.id);
    return res.json({ success: true, message: "Recipe deleted" });
  } catch (err) {
    return res.status(404).json({ success: false, message: err.message });
  }
};

exports.saveRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const saved = await recipeService.saveRecipe(id, userId);
    return res.json({ success: true, data: saved });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSavedRecipes = async (req, res) => {
  try {
    const { userId } = req.params;
    const savedRecipes = await recipeService.getSavedRecipes(userId);
    return res.json({ success: true, data: savedRecipes });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
