const express = require("express");
const Spati = require("../models/spati");
const spatiRouter = express.Router();

spatiRouter
  .route("/")
  .options((req, res) => res.sendStatus(200))
  //retrieve spätis
  .get((req, res, next) => {
    //check if there's a query
    const { viertel } = req.query;
    if (viertel) {
      Spati.find({ viertel }).then((spatis) => {
        res.statusCode = 200;
        res.render("index.ejs", { spatis, viertel });
        console.log(viertel);
      });
    } else {
      Spati.find()
        .then((spatis) => {
          res.statusCode = 200;
          // res.setHeader("Content-Type", "application/json");
          // res.json(spatis);
          res.render("index.ejs", { spatis, viertel: "All" });
        })
        .catch((err) => next(err));
    }
    //ordered by distance?
  })
  .post(
    //verifyUser
    (req, res, next) => {
      Spati.create(req.body)
        .then((spati) => {
          console.log(spati);
          console.log(req.body.spati);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          //res.json(spati);
          res.redirect(`/`);
        })
        .catch((err) => next(err));
    }
  )
  .put((req, res) => {
    res.statusCode = 403;
    res.end("No PUT operations supported on /spatis, baby");
  })
  .delete(
    //verifyUser
    (req, res, next) => {
      Spati.deleteMany()
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

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

spatiRouter.route("/new").get((req, res) => {
  console.log(viertels);
  res.render("spatiNew.ejs", { viertels });
});

spatiRouter
  .route("/:id")
  .get((req, res, next) => {
    //get spati + indications + tags
    const { id } = req.params;
    Spati.findById(id)
      //      .populate("comments.author")
      .then((spati) => {
        res.statusCode = 200;
        console.log(spati);
        // res.setHeader("Content-Type", "application/json");
        // res.json(spati);
        res.render("spatiDetails.ejs", { spati });
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /spatis/${req.params.id}`);
  })
  .put(
    //verify user matches author
    (req, res, next) => {
      const { id } = req.body;
      Spati.findOneAndReplace(id, req.body, { runValidators: true }).then(
        (spati) => {
          res.statusCode = 200;
          console.log(spati);
          res.redirect(`/spatis/${spati._id}`);
        }
      );
    }
  )
  .delete(
    //verify if user matches author
    (req, res, next) => {
      Spati.findByIdAndDelete(req.params.id)
        .then((response) => {
          res.statusCode = 200;
          // res.setHeader("Content-Type", "application/json");
          // res.json(response);
          res.redirect("/");
        })
        .catch((err) => next(err));
    }
  );

spatiRouter.route("/:id/edit").get((req, res) => {
  const { id } = req.params;
  Spati.findById(id)
    .then((spati) => {
      console.log(spati);
      res.render("spatiEdit.ejs", { spati, viertels });
    })
    .catch((err) => next(err));
});

//Endpoints for /:spatiId/comments

spatiRouter
  .route("/:id/comments")
  .get((req, res, next) => {
    Spati.findById(req.params.id)
      // .populate("comments")
      .then((spati) => {
        if (spati) {
          //check if it exists = non null
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(spati.comments);
        } else {
          err = new Error(`Spati ${req.params.id} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post(
    //add verify user
    (req, res, next) => {
      Spati.findById(req.params.id)
        .then((spati) => {
          if (spati) {
            //req.body.author = req.user._id; //saves comment + getting user id to populate author's field
            spati.comments.push(req.body);
            console.log(req.body);
            spati
              .save() //saving to db
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
    }
  )
  .put((req, res) => {
    res.statusCode = 403;
    res.end(
      `PUT operation not supportted on /spatis/${req.params.id}/comments`
    );
  })
  .delete((req, res, next) => {
    Spati.findById(req.params.id)
      .then((spati) => {
        if (spati) {
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
  });

spatiRouter
  .route("/:id/comments/:commentId")
  .get((req, res, next) => {
    //get spati id
    const { id } = req.params;
    Spati.findById(req.params.id)
      //      .populate("comments.author")
      //.populate("comments")
      .then((spati) => {
        res.statusCode = 200;
        res.json(spati.comments.id(req.params.commentId));
        // res.setHeader("Content-Type", "application/json");
        // res.json(spati);
        // res.render("spatiDetails.ejs", { spati });
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /spatis/${req.params.id}/comments/${req.params.commentId}`
    );
  })
  .put(
    //verify user matches author
    (req, res) => {
      res.statusCode = 403;
      res.end(
        `No PUT operations supported on /spatis/${req.params.id}/comments/${req.params.commentId}, baby`
      );
    }
  )
  .delete((req, res, next) => {
    Spati.findById(req.params.id).then((spati) => {
      spati.comments.id(req.params.commentId).remove();
      spati
        .save()
        .then((spati) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(spati);
        })
        .catch((err) => next(err));
    });
  });

module.exports = spatiRouter;
