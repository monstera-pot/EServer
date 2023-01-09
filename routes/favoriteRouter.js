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
      //res.statusCode = 200;
      //res.setHeader("Content-Type", "application/json");
      //res.json(favorites.spatis);
    })
    .catch((err) => next(err));
});
//.post((req, res, next) => {
//user has already a favorite document
//Favorite.findOne({ user: req.user._id }).then((favorite) => {
//console.log("USER IS:", favorite.user);
/*  if (favorite) {
        console.log("Favorite is: ", favorite);
        //user + array of favs
        //req.body.forEach((fv) => {
        //  if (!favorite.spatis.includes(fv._id)) {
        Favorite.push(favorite._id)
          .save()
          .then((favorite) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favorite);
          })
          .catch((err) => next(err));
      } else {
        //we create document from scratch:
        Favorite.create({ user: req.user._id }).then((favorite) => {
          favorite.spatis.push(req.body.spatis);
          // req.body.forEach((fv) => {
          //   favorite.spatis.push(fv._id);
        });
        favorite.save().then((favorite) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorite);
        });
      }
    });
  });

// .put
//not suppported
//()
//.delete
//verifyUser
//find + delete
//();
*/
favoriteRouter
  .route("/:id")
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
        console.log("Favorite is: ", favorite);
        favorite.save().then((favorite) => {
          if (favorite.spatis.includes(req.params.id)) {
            req.flash("success", "Spati is already a favorite");
            res.redirect(`/spatis/${req.params.id}`);
          } else {
            favorite.spatis.push(req.params.id);
            favorite.save().then((favorite) => {
              req.flash("success", "Spati successfully added to favorites");
              res.redirect("/favorites");
              //res.statusCode = 200;
              //res.setHeader("Content-Type", "application/json");
              //res.json(favorite);
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
            req.flash("success", "Spati is already a favorite");
            res.redirect("/favorites");
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
//verifyuser
//check if favorites exist
//delete favorite
// ();

module.exports = favoriteRouter;
