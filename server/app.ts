import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import socketSetup from "./sockets/socket";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  const port = 8080;
  server.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
});
socketSetup(server);
