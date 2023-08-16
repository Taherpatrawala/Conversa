import { Server } from "socket.io";

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
      socket.to(data.roomValue).emit("receive-message", data);
    });

    socket.on("join-room", (roomName) => {
      socket.join(roomName);
    });

    socket.on("join-private-room", (roomName) => {
      socket.join(roomName);
    });
  });
}
export default socketSetup;
