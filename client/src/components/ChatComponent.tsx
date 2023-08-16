import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../slices/userInfoSlice";
import { RootState } from "../store/store";

const ChatComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRoomRef = useRef<HTMLInputElement>(null);
  const replyRef = useRef<HTMLHeadingElement>(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const twoUsers: any = useSelector((state: RootState) => state.users.twoUsers);

  let reply;
  const socket = io("http://localhost:8080");

  function createPrivateRoom() {
    const { user1, user2 } = twoUsers;

    let roomName = [user1, user2].sort().join("--with--");
    console.log(roomName);

    return roomName;
  }

  let privateRoomValue: string;
  if (twoUsers) {
    console.log(twoUsers);
    privateRoomValue = createPrivateRoom();
    socket.emit("join-private-room", privateRoomValue);
  } else {
    console.log(twoUsers);
  }

  function handleClick() {
    const inputValue = inputRef.current?.value;
    const roomValue = inputRoomRef.current?.value;

    if (roomValue) {
      socket.emit("send-message", { inputValue, roomValue });
      reply = inputValue;
    } else if (twoUsers) {
      socket.emit("send-message", { inputValue, privateRoomValue });
      reply = inputValue;
    }
  }

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:8080/protected", { withCredentials: true })
        .then((res) => {
          //  console.log(res.data);
          dispatch(setUserInfo(res.data));
          //    console.log(setUserInfo(res.data));
        });
    })();
  }, []);

  function handleRooms() {
    const roomValue: any = inputRoomRef?.current?.value;
    socket.emit("join-room", roomValue);
    console.log(roomValue);
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server :)");
    });

    socket.on("receive-message", (data) => {
      replyRef.current!.innerText = data.inputValue;
      reply = replyRef.current?.innerHTML; // ! means that it is not null
    });
  }, [socket]);

  return (
    <div className="min-h-screen bg-slate-400 w-[70vw]">
      <div className="flex justify-center  mt-6 fixed bottom-5">
        <input
          type="text"
          placeholder="message..."
          ref={inputRef} //ref means it is a reference to the input element unlike value which is the value of the input element
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
          className="p-5 w-[50vw] rounded-md ml-8"
        />
        <button
          onClick={handleClick}
          className="border-2 border-[#e75353] rounded-md"
        >
          Send
        </button>
      </div>
      <div className="flex justify-center mt-3">
        <input
          type="text"
          placeholder="room..."
          ref={inputRoomRef} //ref means it is a reference to the input element unlike value which is the value of the input element
          onKeyDown={(e) => {
            if (e.key === "Enter") handleRooms();
          }}
        />
        <button
          onClick={handleRooms}
          className="border-2 border-[#e75353] rounded-md"
        >
          Join
        </button>
      </div>

      <h1 ref={replyRef} className="text-2xl">
        {reply}
      </h1>
    </div>
  );
};
export default ChatComponent;
