import { Router } from "express";
import User from "../schemas/userSchema";

const usersRoute = Router();

usersRoute.get("/all-users", async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

export default usersRoute;
