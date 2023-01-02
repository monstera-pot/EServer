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
    console.log("**************spati._id is: ", spati._id);
    console.log("**************req.user is: ", req.user._id);
    if (!spati._id.equals(req.user._id)) {
      req.flash("success", "You do not have permission to do that!");
      return res.redirect(`/spatis/${id}`);
    }
  });
  next();
};
