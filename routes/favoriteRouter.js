const express = require("express");
const favoriteRouter = express.Router();

favoriteRouter
  .route("/")
  .get
  //verifyUser
  //find + populate Favorites
  ()
  .post
  //verify User
  //check if favorite exists already
  //save favorite
  ()
  .put
  //not suppported
  ()
  .delete
  //verifyUser
  //find + delete
  ();

favoriteRouter
  .route("/favorites/:spatiId")
  .get
  //display favorite
  ()
  .post
  //verifyUser
  //check if already added
  //add favorite
  ()
  .delete
  //verifyuser
  //check if favorites exist
  //delete favorite
  ();
