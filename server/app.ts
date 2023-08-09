import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  const port = 8080;
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
});
