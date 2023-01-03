const Spati = require("./models/spati");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be logged in");
    return res.redirect("/users/login");
  }
  next();
};

module.exports.isAuthor = (req, res, next) => {
  const { id } = req.params;
  Spati.findById(id).then((spati) => {
    if (!spati.author.equals(req.user._id)) {
      req.flash("success", "No permission!");
      return res.redirect(`/spatis/${id}`);
    }
    next();
  });
};
