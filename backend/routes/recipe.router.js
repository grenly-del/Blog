const express = require("express");
const router = express.Router();
const recipeController = require("../app/recipe/recipe.controller");
const upload = require("../middleware/cloudinaryStorage");
const verifyToken = require("../middleware/verifyToken");

// TEST Route (untuk pengujian)
// Menunjukkan kalau route ini berfungsi
router.get("/recipestest", (req, res) => {
  res.send("Hello from recipe router test");
});

// CREATE - Tambah resep baru (dengan upload gambar)
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  recipeController.createRecipe
);

// READ - Ambil semua resep
router.get("/", recipeController.getAllRecipes);

// READ - Ambil resep berdasarkan ID
router.get("/with-id", verifyToken, recipeController.getRecipeByUserId);

// UPDATE - Update resep (termasuk upload gambar baru)
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  recipeController.updateRecipe
);

router.get("/:id", recipeController.getRecipeById);

// DELETE - Hapus resep berdasarkan ID
router.delete("/:id", verifyToken, recipeController.deleteRecipe);

module.exports = router;
