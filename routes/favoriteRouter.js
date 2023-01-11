const express = require("express");
const favoriteRouter = express.Router();
const Favorite = require("../models/favorite");
const { isLoggedIn } = require("../Middleware");
const user = require("../models/user");

favoriteRouter.route("/").get(isLoggedIn, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })
    .populate("user")
    .populate("spatis")
    .then((favorites) => {
      console.log("Favorites document:", favorites);
      res.render("favorites.ejs", { spatis: favorites.spatis });
    })
    .catch((err) => next(err));
});

favoriteRouter
  .route("/:id")
  // .get((req, res, next) => {
  //   res.redirect("/favorites");
  // })
  .post(isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    Favorite.findOne({ user: req.user._id }).then((favorite) => {
      if (!favorite) {
        Favorite.create({ user: req.user._id }).then((fav) => {
          fav.spatis
            .push(fav._id)
            .save()
            .then((favorite) => {
              req.flash("success", "Spati successfully added to favorites");
              res.redirect("/favorites");
            });
        });
      } else {
        favorite.save().then((favorite) => {
          if (favorite.spatis.includes(id)) {
            req.flash("success", "Spati is already a favorite");
            res.redirect(`/spatis/${id}`);
          } else {
            favorite.spatis.push(id);
            favorite.save().then((favorite) => {
              req.flash("success", "Spati successfully added to favorites");
              res.redirect("/favorites");
            });
          }
        });
      }
    });
  })
  .delete(isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    Favorite.findOne({ user: req.user._id })
      .then((favorite) => {
        const favIndex = favorite.spatis.indexOf(id);
        favorite.spatis.splice(favIndex, 1);
        favorite
          .save()
          .then((favorite) => {
            res.statusCode = 200;
            req.flash("success", "Spati successfully deleted");
            res.redirect("/favorites");
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;
