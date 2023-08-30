import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  profileImage: {
    type: String,
  },
  googleId: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("User", userSchema);
