var express = require("express");
var router = express.Router();
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/test");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
