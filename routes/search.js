const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const searchController = require("../controllers/search.js");

router.route("/").get(searchController.searchOptions);

module.exports = router;
