const mongoose = require("mongoose");
const Spati = require("./models/spati");
const User = require("./models/user");

mongoose
  .connect("mongodb://localhost:27017/spatiBase", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongoose Connection OPEN");
  })
  .catch((err) => {
    console.log("mongoose ERROR NOOO");
    console.log(err);
  });

// const seeds = [
//   {
//     title: "Drinkhall",
//     address: "Oranienstr. 177",
//     PLZ: 10999,
//     viertel: "Kreuzberg",
//     isAccessible: false,
//     comments: [],
//   },
//   {
//     title: "Cafe am Schlessi",
//     address: "Schlesische Str. 5",
//     PLZ: 10997,
//     viertel: "Kreuzberg",
//     isAccessible: false,
//     comments: [],
//   },
//   {
//     title: "Echtes Spati",
//     address: "Strasse Str. 123",
//     PLZ: 12345,
//     viertel: "Kreuzberg",
//     isAccessible: true,
//     comments: [],
//   },
// ];

// Spati.insertMany(seeds)
//   .then((s) => console.log(s))
//   .catch((err) => console.log(err));

const userSeeds = [
  {
    firstname: "John",
    lastname: "Doe",
  },
  {
    firstname: "Derp",
    lastname: "McDerpson",
  },
  {
    firstname: "Roxanne",
    lastname: "Roxana Dana",
  },
];

User.insertMany(userSeeds)
  .then((us) => console.log(us))
  .catch((err) => console.log(err));

// {
//   rating: 5,
//   text: "THE BEST",
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// },
// {
//   rating: 4,
//   text: "THE BEST MINUS ONE",
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// },
