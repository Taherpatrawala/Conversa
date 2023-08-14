import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import socketSetup from "./sockets/socket";
import passport from "passport";
import session from "express-session";
import { Request, Response, NextFunction } from "express";
import "./routes/google";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

app.use(session({ secret: `${process.env.SESSION_SECRET}` }));
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failed",
    successRedirect: "/protected",
  })
);

app.get("/protected", (req: Request, res: Response, next: NextFunction) => {
  let user = req.user;
  res.json(user);
});
mongoose.connect(process.env.MONGO_URI as string).then(() => {
  const port = 8080;
  server.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
});
socketSetup(server);
