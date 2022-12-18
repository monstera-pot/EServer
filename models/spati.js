const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    // author: {
    //   type: mongoose.Schema.Types.ObjectId, //instead of String w/author, we store a reference to user documents obj id.
    //   ref: "User", //this is the model we use
    // },
  },
  {
    timestamps: true,
  }
);

const spatiSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
      required: true,
      unique: true,
    },
    address: {
      type: String,
      default: "",
      required: true,
      unique: true,
    },
    PLZ: {
      type: Number,
      default: "",
      required: true,
      unique: true,
    },
    viertel: {
      type: String,
      default: "",
      required: true,
      unique: true,
    },
    isAccessible: {
      type: Boolean,
      default: true,
    },
    comments: [commentSchema], //array w/"sub" schema inside.
  },
  {
    timestamps: true,
  }
);

const Spati = mongoose.model("Spati", spatiSchema);

module.exports = Spati;
