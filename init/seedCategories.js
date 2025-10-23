const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const Category = require("../models/categories.js"); // your Category model
const categoryData = require("./categorydata.js");

mongoose
  .connect("mongodb://127.0.0.1:27017/wanderlust", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

async function seedCategories() {
  await Category.deleteMany({});
  for (const category of categoryData) {
    const listingIds = [];
    for (const title of category.listings) {
      const listing = await Listing.findOne({ title });
      if (listing) {
        listingIds.push(listing._id);
      }
    }
    const newCategory = new Category({
      name: category.name,
      listings: listingIds,
    });
    await newCategory.save();
    console.log(newCategory);
  }
  console.log("all categories added successfully ");
  mongoose.connection.close();
}

seedCategories();
