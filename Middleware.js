const Spati = require("./models/spati");
const Favorite = require("./models/favorite");

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

module.exports.isFavorite = (req, res, next) => {
  //const { id } = req.params;
  if (req.user) {
    Favorite.findOne({ user: req.user._id }).then((favorite) => {
      console.log(favorite);
      if (favorite.spatis.includes(req.params.id)) {
        req.isFavorite = true;
        res.locals.isFavorite = true;
      }
    });
  }
  next();
};
