const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

//
module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "Review: thanks for your review");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  let deletedReview = await Review.findByIdAndDelete(reviewId);
  console.log(deletedReview);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success", "Review deleted");
  res.redirect(`/listings/${id}`);
};
