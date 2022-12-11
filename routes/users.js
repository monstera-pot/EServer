const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  //show all users
  User.find().then((users) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(users);
  });
});

//New user registration
userRouter.post("/signup", (req, res) => {
  //New User
  //Check if user exists already
  //if user is successfully created we access user document
});

userRouter.get("/logout", (req, res) => {
  //req.session.destroy
  //check if user is logged in
});

//Third party authentication?

module.exports = userRouter;
