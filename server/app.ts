import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import socketSetup from "./sockets/socket";
import googleRoutes from "./routes/googleRoutes";
import usersRoute from "./routes/usersData";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import User from "./schemas/userSchema";
require("custom-env").env();

const app = express();
dotenv.config();
app.use(bodyParser.json());
//app.use(googleRoutes);
app.use(cookieParser(process.env.SESSION_SECRET));

app.set("trust proxy", 1); //this is important because in production the server is behind a load balancer which terminates SSL
app.enable("trust proxy");
app.use(
  session({
    secret: `98598ehvi4uh59g84w9ihvi4h5hv98h`,
    store: MongoStore.create({
      mongoUrl: `${process.env.MONGO_SECRET_URI}`,
    }),
    cookie: {
      domain: process.env.CLIENT_LINK,
      maxAge: 60000000000,
      secure: true,
      sameSite: "none",
      httpOnly: false,
    }, //sameSite: "none" means that the cookie is not sent to the server when the request is coming from a different origin
    resave: false,
    saveUninitialized: true, //this will help us to save the session even if the user is not logged in
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_LINK,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
const server = http.createServer(app);

app.use(usersRoute);

app.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failed",
    successRedirect: `${process.env.CLIENT_LINK}/chat`,
    session: true,
  })
);

export let existingUserExport: any;
app.get("/protected", async (req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  const user: any = req.user;
  console.log("User is", user);
  console.log("Session Data:", req.session);

  if (user) {
    const existingUser: any = await User.findOne({
      email: user.email,
    });
    existingUserExport = existingUser;
    res.json(existingUser);
  } else {
    res.status(401).send("<h1>login failed :(</h1>");
  }
});

app.get("/login-failed", (req, res) => {
  res.status(401).send("<h1>login failed huh</h1>");
});

const PORT = process.env.PORT || 8080;

try {
  mongoose.connect(process.env.MONGO_SECRET_URI as string).then(() => {
    server.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  });
  socketSetup(server);
} catch {
  (err: any) => {
    console.log(err);
  };
}
