const express = require("express");
const Spati = require("../models/spati");
const Favorite = require("../models/favorite");
const spatiRouter = express.Router();
const { isLoggedIn, isAuthor } = require("../Middleware");
const authenticate = require("../authenticate");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
require("dotenv").config();
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });
const spatis = require("../controllers/spatis");

spatiRouter
  .route("/")
  .options((req, res) => res.sendStatus(200))
  .get(spatis.index)
  .post(isLoggedIn, spatis.createSpati)
  .delete(isLoggedIn, spatis.deleteAllSpatis);

spatiRouter.route("/new").get(isLoggedIn, spatis.renderNewForm);

spatiRouter
  .route("/:id")
  .get(spatis.showSpati)
  .put(isLoggedIn, isAuthor, spatis.showSpati)
  .delete(isLoggedIn, isAuthor, spatis.deleteSpati);

spatiRouter.route("/:id/edit").get(isLoggedIn, spatis.showEditForm);

spatiRouter
  .route("/:id/comments")
  .post(isLoggedIn, spatis.createComment)
  .delete(isLoggedIn, spatis.deleteAllComments);

spatiRouter
  .route("/:id/comments/:commentId")
  .delete(isLoggedIn, spatis.deleteComment);

module.exports = spatiRouter;
