const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.js");

// Dynamic route for category
router.route("/:categoryName").get(categoryController.category);

module.exports = router;
