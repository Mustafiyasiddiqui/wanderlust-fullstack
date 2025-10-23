const Listing = require("./models/listing.js");
const category = require("./models/categories.js");
const Review = require("./models/reviews.js");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./schema.js");

module.exports.validateListing = async (req, res, next) => {
  const categories = await category.find().select("name -_id");
  const validNames = categories.map((c) => c.name);
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //redirectUrl save
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be login in first to create listing");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  // console.log("Listing owner:", listing.owner);
  // console.log("Logged in user:", req.user);

  if (!req.user || !listing.owner._id.equals(req.user._id)) {
    req.flash("error", "You don't have access to edit.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  // console.log("Listing owner:", listing.owner);
  // console.log("Logged in user:", req.user);

  if (!req.user || !review.author._id.equals(req.user._id)) {
    req.flash("error", "You don't have access to DELETE the review.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
