var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const aboutusRouter = require("./routes/aboutus");
const spatiRouter = require("./routes/spätiRouter");
const favoriteRouter = require("./routes/favoriteRouter");

const methodOverride = require("method-override");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/spatiBase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection OPEN");
  })
  .catch((err) => {
    console.log("ERROR NOOO");
    console.log(err);
  });

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));

//auth should come here
app.use(express.static(path.join(__dirname, "views")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/aboutus", aboutusRouter);
app.use("/spatis", spatiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { err });
});

module.exports = app;
