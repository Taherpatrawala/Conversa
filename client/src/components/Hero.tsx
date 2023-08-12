import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const Hero = () => {
  const [message, setMessage] = useState("");

  const socket = io("http://localhost:8080");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server :)");
    });
  }, [socket]);

  function handleClick() {
    socket.emit("send-message", `${message}`);
  }

  return (
    <div className="min-h-screen bg-slate-400">
      <div className="flex justify-center w-full translate-y-4">
        <input
          type="text"
          placeholder="message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          onClick={handleClick}
          className="border-2 border-[#e75353] rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Hero;
