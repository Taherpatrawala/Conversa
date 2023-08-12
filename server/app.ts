import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected with id ${socket.id}`);
});

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  const port = 8080;
  server.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
});
