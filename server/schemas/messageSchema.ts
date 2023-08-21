import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  roomId: { type: String, required: true },
  message: { type: String, required: true, trim: true },
  timestamp: { type: Date, required: true, trim: true },
});

export default mongoose.model("Message", messageSchema);
