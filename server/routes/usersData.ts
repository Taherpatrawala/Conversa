import { Router } from "express";
import User from "../schemas/userSchema";
import Message from "../schemas/messageSchema";
import "../auth/google";

const usersRoute = Router();

usersRoute.get("/all-users", async (req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  const user = req.user;

  console.log("Getting all users", user);

  const users = await User.find();
  res.status(200).json(users);
});

export let twoUsers: any;
usersRoute.post("/create-private-room", (req, res, next) => {
  twoUsers = req.body;

  res.status(200).json(twoUsers);
});

usersRoute.post("/get-private-room-messages", (req, res, next) => {
  const { user1, user2, privateRoomValue } = req.body;
  Message.find({ roomId: privateRoomValue })
    .sort({ timestamp: -1 })
    .limit(10)
    .then((messages) => {
      res.status(200).json({ messages: messages.reverse() });
    });
});

usersRoute.get("/logout", (req, res) => {
  req.logout;
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie("connect.sid");
    res.status(200).json("User logged out");
  });
});
export default usersRoute;
