var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("helloUsers");
  //show user
});

//New user registration
router.post("/signup", (req, res) => {
  //New User
  //Check if user exists already
  //if user is successfully created we access user document
});

router.get("/logout", (req, res) => {
  //req.session.destroy
  //check if user is logged in
});

//Third party authentication?

module.exports = router;
