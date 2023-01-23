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
    author: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const spatiSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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
      unique: false,
    },
    viertel: {
      type: String,
      default: "",
      required: true,
    },
    location: {
      coordinates: {
        type: [Number],
        required: true,
      },
      type: {
        type: String, //{"coordinates":[13.418520000000001,52.500491999999994],"type":"Point"}
        enum: ["Point"],
        required: true,
      },
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
