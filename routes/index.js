var express = require("express");
var router = express.Router();
const Spati = require("../models/spati");

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/test");

/* GET home page. */
router.get("/", function (req, res, next) {
  //create a variable to contain elements of the spati collection
  //add this variable as second argument of render
  console.log("Route / 's req.user is:", req.user);

  Spati.find({})
    .then((spatis) => {
      res.statusCode = 200;
      //res.setHeader("Content-Type", "application/json");
      //res.json(spatis);
      res.render("index.ejs", { spatis, viertel: "All" });
    })
    .catch((err) => next(err));
});

module.exports = router;
