import { Router } from "express";
import User from "../schemas/userSchema";
import Message from "../schemas/messageSchema";

const usersRoute = Router();

usersRoute.get("/all-users", async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

export let twoUsersData: any;
usersRoute.post("/create-private-room", (req, res, next) => {
  twoUsersData = req.body;

  // console.log(twoUsers);
  res.status(200).json(twoUsersData);
  next();
});

export default usersRoute;
