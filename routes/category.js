const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");
const Category = require("../models/categories.js");

// Dynamic route for category
router.get('/listings/category/:categoryName', async (req, res) => {
let { categoryName } = req.params;
const category = await Category.findOne({ name : categoryName}).populate("listings");
        if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("listings/category", { category });
      
});


module.exports = router;
