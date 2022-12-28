const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt; //obj w/helper methods (to extract jwt)
const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens

const config = require("./config.js");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//get token method:
exports.getToken = (user) => {
  //we create + return the token
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 }); //one hour
};

// options is an object literal containing options to control how the token is extracted from the request or verified.
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //(REQUIRED) Function that accepts a request as the only parameter and returns either the JWT as a string or null.
opts.secretOrKey = config.secretKey; //string / buffer containing the secret for verifying the token's signature. REQUIRED.

//new JwtStrategy(options, verify)
// verify is a function with the parameters verify(jwt_payload, done)
//     jwt_payload is an object literal containing the decoded JWT payload.
//     done is a passport error first callback accepting arguments done(error, user, info)

//export jwtStrategy:
exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT Payload:", jwt_payload);
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        console.log("No error but also no user");
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
