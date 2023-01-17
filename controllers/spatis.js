const Spati = require("../models/spati");

const viertels = [
  "Mitte",
  "Friedrichshain - Kreuzberg",
  "Pankow",
  "Charlottenburg - Wilmersdorf",
  "Spandau",
  "Steglitz - Zehlendorf",
  "Tempelhof - Schöneberg",
  "Neukölln",
  "Treptow - Köpenick",
  "Lichtenberg",
  "Marzahn - Hellersdorf",
  "Reinickendorf",
];

module.exports.index = (req, res, next) => {
  //check if there's a query
  const { viertel } = req.query;
  if (viertel) {
    Spati.find({ viertel })
      .then((spatis) => {
        res.statusCode = 200;
        res.render("index.ejs", {
          spatis,
          viertel,
        });
      })
      .catch((err) => next(err));
  } else {
    Spati.find()
      .then((spatis) => {
        res.statusCode = 200;
        res.render("index.ejs", { spatis, viertel: "All" });
      })
      .catch((err) => next(err));
  }
};

module.exports.createSpati = async (req, res, next) => {
  //   const georesponse = await geocoder
  //     .forwardGeocode({
  //       query: "12053, Berlin",
  //       countries: ["de"],
  //       limit: 1,
  //     })
  //     .send();
  //   console.log(georesponse.body.features[0].geometry.coordinates);
  //   res.send("FOUND! ");
  Spati.create(req.body)
    .then((spati) => {
      spati.author = req.user._id;
      spati
        .save()
        .then((spati) => {
          req.flash("success", "Successfully added Spati");
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.redirect(`/`);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.renderNewForm = (req, res) => {
  res.render("spatiNew.ejs", { viertels });
};

module.exports.showSpati = (req, res, next) => {
  const { id } = req.params;
  Spati.findById(id)
    .populate("comments")
    .populate("comments.author")
    .then((spati) => {
      res.statusCode = 200;
      res.render("spatiDetails.ejs", {
        spati,
      });
    })
    .catch((err) => next(err));
};

module.exports.showEditForm = (req, res, next) => {
  const { id } = req.params;
  Spati.findById(id)
    .then((spati) => {
      res.render("spatiEdit.ejs", { spati, viertels });
    })
    .catch((err) => next(err));
};

module.exports.deleteSpati = (req, res, next) => {
  Spati.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.statusCode = 200;
      req.flash("success", "Successfully deleted Späti");
      res.redirect("/");
    })
    .catch((err) => next(err));
};

module.exports.createComment = (req, res, next) => {
  const { id } = req.params;
  Spati.findById(id)
    .then((spati) => {
      if (spati) {
        req.body.author = req.user._id; //saves comment + getting user id to populate author's field
        spati.comments.push(req.body);
        spati
          .save()
          .then((spati) => {
            res.statusCode = 200;
            req.flash("success", "Successfully added comment");
            res.redirect(`/spatis/${id}`);
          })
          .catch((err) => next(err));
      } else {
        err = new Error(`Spati ${id} not found`);
        err.status = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

module.exports.deleteAllComments = (req, res, next) => {
  Spati.findById(req.params.id)
    .then((spati) => {
      if (spati) {
        //delete ALL comments of a specific spati
        for (let i = spati.comments.length - 1; i >= 0; i--) {
          spati.comments.id(spati.comments[i]._id).remove();
        }
        spati
          .save()
          .then((spati) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(spati);
          })
          .catch((err) => next(err));
      } else {
        err = new Error(`Spati ${req.params.id} not found`);
        err.status = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

module.exports.deleteComment = (req, res, next) => {
  const { id } = req.params;
  Spati.findById(req.params.id)
    .then((spati) => {
      spati.comments.id(req.params.commentId).remove();
      spati
        .save()
        .then((spati) => {
          const commentId = spati.comments.id(req.params.commentId);
          res.statusCode = 200;
          req.flash("success", "Successfully deleted comment");
          res.redirect(`/spatis/${id}`);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.deleteAllSpatis = (req, res, next) => {
  Spati.deleteMany()
    .then((response) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(response);
    })
    .catch((err) => next(err));
};
