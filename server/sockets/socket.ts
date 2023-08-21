import { Server } from "socket.io";
import Message from "../schemas/messageSchema";
import { twoUsers } from "../routes/usersData";

function socketSetup(server: any) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected with id ${socket.id}`);

    socket.on("send-message", (data) => {
      Message.create({
        senderId: data.twoUsers.user2,
        receiverId: data.twoUsers.user1,
        roomId: data.privateRoomValue,
        message: data.inputValue,
        timestamp: data.timestamp,
      });
      socket.to(data.privateRoomValue).emit("receive-message", data);
    });

    socket.on("join-room", (roomName) => {
      socket.join(roomName);
    });

    socket.on("join-private-room", (privateRoomValue) => {
      socket.join(privateRoomValue);
    });
  });
}
export default socketSetup;
