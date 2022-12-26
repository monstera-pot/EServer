const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const passport = require("passport");

/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  //show all users
  //I should check if Admin
  User.find().then((users) => {
    res.statusCode = 200;
    //res.setHeader("Content-Type", "application/json");
    //res.json(users);
    console.log(users);
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
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: true, status: "Registration Successful!" });
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
    passport.authenticate("local", { failureRedirect: "/login" }),
    (req, res, next) => {
      res.redirect("/");
    }
  );

userRouter.get("/logout", (req, res) => {
  //req.session.destroy
  //check if user is logged in
});

userRouter
  .route("/:userId")
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
