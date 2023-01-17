const User = require("../models/user");
const authenticate = require("../authenticate");

module.exports.showAllUsers = (req, res, next) => {
  User.find().then((users) => {
    res.statusCode = 200;
    res.render("users.ejs", { users });
  });
};

module.exports.showSignupForm = (req, res, next) => {
  res.statusCode = 200;
  //res.setHeader("Content-Type", "application/json");
  res.render("signupForm.ejs");
};

module.exports.createUser = (req, res, next) => {
  const { username, password, email } = req.body;
  User.register(new User({ username, email }), password, (err, user) => {
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
};

module.exports.showLoginForm = (req, res, next) => {
  res.render("loginForm.ejs");
};

module.exports.login = (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.token = token;
  res.statusCode = 200;
  res.setHeader("ContentType", "application/json");
  req.flash("success", "Successfully logged in !");
  const redirectUrl = req.session.returnTo || "/";
  console.log("RedirectURL: ", redirectUrl);
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
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
};

module.exports.showUser = async (req, res) => {
  const { id } = req.params; //we capture id from the req.params
  User.findById(req.params.id).then((user) => {
    res.statusCode = 200;
    res.render("user.ejs", { user });
  });
};
