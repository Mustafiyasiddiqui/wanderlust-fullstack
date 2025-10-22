const Listing = require("../models/listing.js");

module.exports.searchOptions = async (req, res) => {
  const { location } = req.query;
  let query = {};
  if (location && location.trim() !== "") {
    query = { location: { $regex: `^${location.trim()}$`, $options: "i" } };
  }
  const listings = await Listing.find(query);

  res.render("listings/search.ejs", {
    listings,
    location,
    total: listings.length,
  });
};
