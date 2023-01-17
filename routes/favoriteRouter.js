const express = require("express");
const favoriteRouter = express.Router();
const Favorite = require("../models/favorite");
const { isLoggedIn } = require("../Middleware");
const user = require("../models/user");
const favorites = require("../controllers/favorites");

favoriteRouter.route("/").get(isLoggedIn, favorites.showFavorites);

favoriteRouter
  .route("/:id")
  .post(isLoggedIn, favorites.addFavorite)
  .delete(isLoggedIn, favorites.removeFavorite);

module.exports = favoriteRouter;
