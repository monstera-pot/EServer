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
