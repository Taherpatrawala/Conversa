import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import socketSetup from "./sockets/socket";
import googleRoutes from "./routes/googleRoutes";
import usersRoute from "./routes/usersData";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
const server = http.createServer(app);

app.use(googleRoutes);
app.use(usersRoute);

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  const port = 8080;
  server.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
});
socketSetup(server);
