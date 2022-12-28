const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { isLoggedIn } = require("../MiddlewareIsLoggedIn");
const jwt = require("jsonwebtoken");
const authenticate = require("../authenticate");

// ...

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
    console.log(req.body);
    User.register(new User({ username, email }), password, (err, user) => {
      //const newUser = new User({ username: req.body.username });
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      }
      // user.save((err) => {
      //   if (err) {
      //     res.statusCode = 500;
      //     res.setHeader("Content-Type", "application/json");
      //     res.json({ err: err });
      //     return;
      //   }
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Successfully logged in");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.redirect(`/`);
        //res.json({ success: true, status: "Registration Successful!" });
        //also sends response so we end here.
      });
    });
  });
// User.find({ firstname: req.body.firstname }).then((user) => {
//   if (user) {
//     res.statusCode = 400;
//     res.send("user already exists ;)");
//   } else {
//     const newUser = new User({
//       username: req.body.username,
//       lastname: req.body.lastname,
//     });
//     newUser.save();
//     res.statusCode = 200;
//     res.json(newUser);
//   }
// });
//Check if user exists already

//User.findOne({ "username": })
//if user is successfully created we access user document
// });

userRouter
  .route("/login")
  .get((req, res, next) => {
    res.render("loginForm.ejs");
  })
  .post(
    passport.authenticate("local"),
    //{ failureRedirect: "/login" },
    (req, res) => {
      const token = authenticate.getToken({ _id: req.user._id });
      console.log("token", token);
      console.log("req.user:", req.user);
      res.statusCode = 200;
      res.setHeader("ContentType", "application/json");
      res.json({
        success: true,
        token: token, //we add token to response obj
        status: "You are successfully logged in!",
      });
      //res.send("LOGGED IN ");
      // req.flash("success", "Successfully logged in");
      // res.redirect("/users");
      // req.login(user);
      // res.redirect("/");
    }
  );

userRouter.route("/logout").get((req, res) => {
  //req.session.destroy
  if (req.session) {
    req.flash("success", "Successfully logged out");
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    const err = new Error("You are not logged in!");
    err.status = 401;
    return next(err);
  }
});

userRouter
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params; //we capture id from the req.params
    //console.log(req.params.userId);
    User.findById(req.params.id).then((user) => {
      res.statusCode = 200;
      console.log(user);
      res.render("user.ejs", { user });
    });
  })
  .delete((req, res) => {});

//Third party authentication?

module.exports = userRouter;
