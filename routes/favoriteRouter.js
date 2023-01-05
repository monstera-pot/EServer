const express = require("express");
const favoriteRouter = express.Router();
const Favorite = require("../models/favorite");
const { isLoggedIn } = require("../Middleware");
const user = require("../models/user");

favoriteRouter.route("/").get((req, res, next) => {
  Favorite.find()
    .populate("user")
    .populate("spatis")
    .then((favorites) => {
      console.log("Favorites document:", favorites);
      res.render("favorites.ejs", { favorites });
      res.statusCode = 200;
      //res.setHeader("Content-Type", "application/json");
      //res.json(favorites);
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
  /*.get(isLoggedIn, (req, res, next) => {
    Favorite.find({ user: req.user._id })
      .then((favorites) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "Applicaction/json");
        res.json(favorites);
      })
      .catch((err) => next(err));
  }) */
  //display favorite // not supported
  //perhaps redirect to spatis/spatiId
  // ()
  .post(isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    Favorite.findOne({ user: req.user._id }).then((favorite) => {
      if (!favorite) {
        Favorite.create({ user: req.user._id }).then((fav) => {
          fav.spatis.push(fav._id).save();
        });
      } else {
        favorite.save().then((favorite) => {
          if (favorite.spatis.includes(req.params.id)) {
            res.setHeader("Content-Type", "text/plain");
            res.end("That campsite is already in the list of favorites!");
          } else {
            favorite.spatis.push(req.params.id);
            favorite.save().then((favorite) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            });
          }
        });
      }
    });
  });
//verifyUser
//check if already added
//add favorite
// ()
// .delete
//verifyuser
//check if favorites exist
//delete favorite
// ();

module.exports = favoriteRouter;
