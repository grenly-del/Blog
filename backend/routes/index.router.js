var express = require("express");
var router = express.Router();
const userRoutes = require("./user.router");
const recipeRoutes = require("./recipe.router");
const errorHandler = require("../middleware/errorHandler");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello Worlds");
});

router.use("/v1/user", userRoutes, errorHandler);
router.use("/v1/recipe", recipeRoutes, errorHandler);

module.exports = router;
