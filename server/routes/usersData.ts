import { Router } from "express";
import User from "../schemas/userSchema";

const usersRoute = Router();

usersRoute.get("/all-users", async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

export let twoUsers: any;
usersRoute.post("/create-private-room", (req, res, next) => {
  twoUsers = req.body;
  // console.log(twoUsers);
  res.status(200).json(twoUsers);
  next();
});

export default usersRoute;
