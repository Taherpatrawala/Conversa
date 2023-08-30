import passport from "passport";
require("dotenv").config();
import User from "../schemas/userSchema";

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
      console.log("profile", profile);

      return done(null, profile);
    }
  )
);

passport.serializeUser(async (user: any, done) => {
  try {
    const existingUser: any = await User.findOne({
      id: user.id,
    });

    console.log("serializeUser", user);

    if (!existingUser) {
      await User.create({
        id: user.id,
        name: user.displayName,
        email: user.emails[0].value,
        profileImage: user.photos[0].value,
        googleId: user.id,
      });
    }

    done(null, user.id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id: any, done) => {
  console.log(typeof id);

  try {
    const user = await User.findOne({ id: id });

    console.log("id", id);

    console.log("deserializing user", user);

    done(null, user);
  } catch (error) {
    done(error);
  }
});
