import passport from "passport";
require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.VITE_SERVER_LINK}/google/callback`,
      scope: ["email", "profile"],
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  //serializeUser is used to store the user object in the session
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  //deserializeUser is used to retrieve the user object from the session
  done(null, user); //here the user is the user object that is given by the google strategy and is stored in the session the first argument is the error and the second is the user object
});
