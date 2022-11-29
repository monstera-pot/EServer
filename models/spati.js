const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spatiSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  address: String,
  PLZ: Number,
  viertel: String,
  isAccessible: Boolean,
});

const Spati = mongoose.model("Spati", spatiSchema);

module.exports = Spati;
