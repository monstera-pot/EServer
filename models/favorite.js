const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  spatis: [
    {
      type: String,
      // {
      //   type: Schema.Types.ObjectId,
      //   ref: "Spati",
    },
  ],
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
