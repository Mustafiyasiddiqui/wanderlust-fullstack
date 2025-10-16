module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you must be login in first to create listing");
    return res.redirect("/login");
  }
  next();
};
