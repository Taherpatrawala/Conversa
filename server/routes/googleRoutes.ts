import { Router } from "express";
import passport from "passport";
import session from "express-session";
import { Request, Response, NextFunction } from "express";
import "../auth/google";
import cors from "cors";
import User from "../schemas/userSchema";
const googleRoutes = Router();

googleRoutes.use(session({ secret: `${process.env.SESSION_SECRET}` }));
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
  })
);

googleRoutes.get(
  "/protected",
  async (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    const user: any = req.user;
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
      res.json(existingUser);
    }
    next();
  }
);

export default googleRoutes;