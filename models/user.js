const mongoose = require("mongoose");
//const { authenticate } = require("passport");
//const passportLocalMongoose = require("passport-local-mongoose");
const router = require("../routes/users");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

//plugin takes care of username + pw; + additional authenticating methods
//like . authenticate

//userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema); //collection named "users",
