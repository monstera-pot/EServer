const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { isLoggedIn } = require("../Middleware");
const jwt = require("jsonwebtoken");
const authenticate = require("../authenticate");

/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  //show all users
  //I should check if Admin
  User.find().then((users) => {
    res.statusCode = 200;
    //res.setHeader("Content-Type", "application/json");
    //res.json(users);
    res.render("users.ejs", { users });
  });
});

//New user registration
userRouter
  .route("/signup")
  .get((req, res, next) => {
    res.statusCode = 200;
    //res.setHeader("Content-Type", "application/json");
    res.render("signupForm.ejs");
  })
  .post((req, res, next) => {
    //New User
    const { username, password, email } = req.body;
    User.register(new User({ username, email }), password, (err, user) => {
      //const newUser = new User({ username: req.body.username });
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Successfully logged in");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.redirect("/");
        //also sends response so we end here.
      });
    });
  });

userRouter
  .route("/login")
  .get((req, res, next) => {
    res.render("loginForm.ejs");
  })
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/users/login",
      keepSessionInfo: true, //to redirect to intended url
    }),
    (req, res) => {
      const token = authenticate.getToken({ _id: req.user._id });
      res.token = token;
      res.statusCode = 200;
      res.setHeader("ContentType", "application/json");
      req.flash("success", "Successfully logged in !");
      const redirectUrl = req.session.returnTo || "/";
      console.log("RedirectURL: ", redirectUrl);
      delete req.session.returnTo;
      res.redirect(redirectUrl);
    }
  );

userRouter.route("/logout").get((req, res) => {
  if (req.session) {
    req.flash("success", "Successfully logged out");
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

userRouter
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params; //we capture id from the req.params
    User.findById(req.params.id).then((user) => {
      res.statusCode = 200;
      res.render("user.ejs", { user });
    });
  })
  .delete((req, res) => {});

module.exports = userRouter;
