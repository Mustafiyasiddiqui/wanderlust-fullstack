const Listing = require("../models/listing.js");
const Category = require("../models/categories.js");

module.exports.category = async (req, res) => {
  let { categoryName } = req.params;
  const category = await Category.findOne({ name: categoryName }).populate(
    "listings"
  );
  if (!category) {
    return res.status(404).send("Category not found");
  }

  res.render("listings/category", { category });
};
