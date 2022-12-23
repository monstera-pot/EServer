const userSeeds = [
  {
    username: "John",
    password: "Doe",
  },
  {
    username: "Derp",
    password: "McDerpson",
  },
  {
    username: "Roxanne",
    password: "Roxana Dana",
  },
];

User.insertMany(userSeeds)
  .then((us) => console.log(us))
  .catch((err) => console.log(err));
