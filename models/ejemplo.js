const ejemplo = [
  {
    title: "Drinkhall",
    address: "Oranienstr. 177",
    PLZ: 10999,
    viertel: "Kreuzberg",
    isAccessible: false,
    comments: [],
  },
  {
    title: "Cafe am Schlessi",
    address: "Schlesische Str. 5",
    PLZ: 10997,
    viertel: "Kreuzberg",
    isAccessible: false,
    comments: [],
  },
  {
    title: "Echtes Spati",
    address: "Strasse Str. 123",
    PLZ: 12345,
    viertel: "Kreuzberg",
    isAccessible: true,
    comments: [
      {
        rating: 5,
        text: "THE BEST",
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
      {
        rating: 4,
        text: "THE BEST MINUS ONE",
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
];
