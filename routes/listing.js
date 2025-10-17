const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

//index router
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

//new router
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});
//create router
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listings);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully made a new listing");
    console.log("listing added", newListing);
    res.redirect("/listings");
  })
);

//show router
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "cannot find that listing");
      return res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listings: listing });
  })
);

//edit router
router.get(
  "/:id/edit",
  isOwner,
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "cannot find that listing");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

//update router
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listings);
    req.flash("success", `Successfully made changes in ${Listing.title}`);
    // { new: true, runValidators: true }
    res.redirect(`/listings/${id}`);
  })
);

//destroy router
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", `${deletedListing.title} successfully deleted`);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);

module.exports = router;
