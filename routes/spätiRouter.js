const express = require("express");
const Spati = require("../models/spati");
const spatiRouter = express.Router();

spatiRouter
  .route("/")
  .options((req, res) => res.sendStatus(200))
  .get((req, res, next) => {
    //retrieve spätis
    Spati.find()
      .then((spatis) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(spatis);
      })
      .catch((err) => next(err));
    //ordered by distance?
  })
  .post(
    //verifyUser
    (req, res, next) => {
      Spati.create(req.body)
        .then((spati) => {
          console.log("Spati added <3", spati);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(campsite);
        })
        .catch((err) => next(err));
    }
  )
  .put((req, res) => {
    res.statusCode = 403;
    res.end("No PUT operations supported on /spati, baby");
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

spatiRouter
  .route("/:spatiId")
  .get((req, res, next) => {
    //get spati + indications + tags
    Spati.findById(req.params.spatiId)
      .populate("comments.author")
      .then((campsite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(spati);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /spatis/${res.params.spatiId}`);
  })
  .put(
    //verify user matches author
    (req, res) => {
      res.statusCode = 403;
      res.end(
        `No PUT operations supported on /spatis/${res.params.spatiId}, baby`
      );
    }
  )
  .delete(
    //verify if user matches author
    (req, res, next) => {
      Spati.findByIdAndDelete(req.params.spatiId)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

//Endpoints for /:spatiId/comments

spatiRouter
  .route("/:spatiId/comments")
  .get((req, res, next) => {
    Spati.findById(req.params.spatiId)
      .populate("comments.author")
      .then((spati) => {
        if (spati) {
          //check if it exists = non null
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(spati.comments);
        } else {
          err = new Error(`Spati ${req.params.spatiId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post(
    //add verify user
    (req, res, next) => {
      Spati.findById(req.params.spatiId)
        .then((spati) => {
          if (spati) {
            req.body.author = req.user._id; //saves comment + getting user id to populate author's field
            spati.comments.push(req.body);
            spati
              .save() //saving to db
              .then((spati) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(spati);
              })
              .catch((err) => next(err));
          } else {
            err = new Error(`Spati ${req.params.spatiId} not found`);
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
      `PUT operation not supportted on /campsites/${req.params.spatiId}/comments`
    );
  })
  .delete((req, res, next) => {
    Spati.findById(req.params.spatiId)
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
          err = new Error(`Spati ${req.params.spatiId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

module.exports = spatiRouter;
