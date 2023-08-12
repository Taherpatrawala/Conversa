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

    socket.on("send-message", (message: string) => {
      socket.broadcast.emit("receive-message", message);
    });
  });
}
export default socketSetup;
