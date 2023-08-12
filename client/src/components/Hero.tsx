import { io } from "socket.io-client";

const Hero = () => {
  const socket = io("http://localhost:8080");

  socket.on("connect", () => {
    console.log("Connected to the server :)");
  });

  return (
    <div className="min-h-screen bg-slate-400">
      <div className="flex justify-center w-full translate-y-4">
        <input type="text" placeholder="message..." />
        <button className="border-2 border-[#e75353] rounded-md">Send</button>
      </div>
    </div>
  );
};
export default Hero;
