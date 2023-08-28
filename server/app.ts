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
require("custom-env").env();

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(googleRoutes);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
const server = http.createServer(app);

app.use(usersRoute);

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
