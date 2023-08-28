import { Router } from "express";
import passport from "passport";
import session from "express-session";
import { Request, Response, NextFunction } from "express";
import "../auth/google";
import cors from "cors";
import User from "../schemas/userSchema";
import MongoStore from "connect-mongo";
const googleRoutes = Router();

googleRoutes.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    store: MongoStore.create({
      mongoUrl: `${process.env.MONGO_SECRET_URI}`,
    }),
    cookie: { maxAge: 60000000000 },
  })
);
googleRoutes.use(passport.initialize());
googleRoutes.use(passport.session());
googleRoutes.use(cors());
googleRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failed",
    successRedirect: "http://localhost:5173/chat",
    session: true,
  })
);

export let existingUserExport: any;
googleRoutes.get(
  "/protected",
  async (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    const user: any = req.user;
    console.log(user);

    if (user) {
      const existingUser: any = await User.findOne({
        email: user.emails[0].value,
      });
      console.log(existingUser);

      if (!existingUser) {
        User.create({
          name: user.displayName,
          email: user.emails[0].value,
          profileImage: user.photos[0].value,
          googleId: user.id,
        });
      }
      existingUserExport = existingUser;
      res.json(existingUser);
    }
    res.status(401).send("<h1>login failed</h1>");
  }
);

googleRoutes.get("/login-failed", (req: Request, res: Response) => {
  res.status(401).send("<h1>login failed</h1>");
});

export default googleRoutes;
