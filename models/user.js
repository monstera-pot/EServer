const mongoose = require("mongoose");
//const { authenticate } = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
//const router = require("../routes/users");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

//username and pw provided by Passport:
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
