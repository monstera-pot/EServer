const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  //show all users
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
  // .get((req, res, next) => {
  //   res.statusCode = 200;
  //   //res.setHeader("Content-Type", "application/json");
  //   res.render("auth.ejs");
  // })
  .post((req, res, next) => {
    //New User
    console.log(req.body);
    //User.register(new User({ username: req.body.fisrtname }), (err, user) => {
    const newUser = new User({ firstname: req.body.firstname });

    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
    } else {
      if (req.body.firstname) {
        user.firstname = req.body.firstname;
      }
      if (req.body.lastname) {
        user.lastname = req.body.lastname;
      }
      user.save((err) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
          return;
        }
      });
    }
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

userRouter.post("/login", (req, res) => {});

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
