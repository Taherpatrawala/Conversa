import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  // const [reply, setReply] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const replyRef = useRef<HTMLHeadingElement>(null);
  let reply;
  const socket = io("http://localhost:8080");

  function handleClick() {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      socket.emit("send-message", `${inputValue}`);
    }
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server :)");
    });

    socket.on("receive-message", (message: string) => {
      // setReply(message);
      replyRef.current!.innerText = message;
      reply = replyRef.current?.innerHTML; // ! means that it is not null
    });
  }, [socket]);

  return (
    <div className="min-h-screen bg-slate-400">
      <div className="flex justify-center w-full translate-y-4">
        <input
          type="text"
          placeholder="message..."
          ref={inputRef} //ref means it is a reference to the input element unlike value which is the value of the input element
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
        />
        <button
          onClick={handleClick}
          className="border-2 border-[#e75353] rounded-md"
        >
          Send
        </button>
      </div>
      <h1 ref={replyRef}>{reply}</h1>
    </div>
  );
};
export default Hero;
