const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  spatis: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spati",
    },
  ],
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
