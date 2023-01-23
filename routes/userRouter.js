const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { isLoggedIn } = require("../Middleware");
const jwt = require("jsonwebtoken");
const authenticate = require("../authenticate");
const users = require("../controllers/users");

userRouter.get("/", users.showAllUsers);

userRouter.route("/signup").get(users.showSignupForm).post(users.createUser);

userRouter
  .route("/login")
  .get(users.showLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/users/login",
      keepSessionInfo: true, //to redirect to intended url
    }),
    users.login
  );

userRouter.route("/logout").get(users.logout);
userRouter.route("/:id").get(users.showUser);

module.exports = userRouter;
