const Listing = require("../models/listing.js");

//index route
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

//render-new-form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

//show all listings
module.exports.showListing = async (req, res) => {
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
};

//create-new-listing
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listings);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "Successfully made a new listing");
  console.log("listing added", newListing);
  res.redirect("/listings");
};

//edit-listing
module.exports.renderEditRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "cannot find that listing");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

//update-edited-listing
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listings);
  req.flash("success", `Successfully made changes in ${Listing.title}`);
  // { new: true, runValidators: true }
  res.redirect(`/listings/${id}`);
};

//destroy-listing
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", `${deletedListing.title} successfully deleted`);
  console.log(deletedListing);
  res.redirect("/listings");
};
