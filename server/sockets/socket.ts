import { Server } from "socket.io";
import Message from "../schemas/messageSchema";

function socketSetup(server: any) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  let onlineUsers: string[] = [];

  io.on("connection", (socket) => {
    onlineUsers.push(socket.id);
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

    socket.on("disconnect", (reason) => {
      onlineUsers.forEach((user, index) => {
        if (user === socket.id) {
          onlineUsers.splice(index, 1);
        }
      });
      socket.broadcast.emit("online-users", onlineUsers);
      console.log("User disconnected", reason, socket.id);
      console.log(onlineUsers);
    });

    socket.broadcast.emit("online-users", onlineUsers);
  });
}
export default socketSetup;
