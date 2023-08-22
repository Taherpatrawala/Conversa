import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../slices/userInfoSlice";
import { RootState } from "../store/store";
import { setChats, setPrivateRoomValue } from "../slices/usersSlice";

const ChatComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRoomRef = useRef<HTMLInputElement>(null);
  const replyRef = useRef<HTMLHeadingElement>(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const twoUsers: any = useSelector((state: RootState) => state.users.twoUsers);
  const chats: any = useSelector((state: RootState) => state.users.chats);
  const privateRoomValue: any = useSelector(
    (state: RootState) => state.users.privateRoomValue
  );

  let reply;
  const socket = io("http://localhost:8080");

  if (twoUsers) {
    socket.emit("join-private-room", privateRoomValue);
  } else {
    console.log(twoUsers);
  }

  function handleClick() {
    const inputValue = inputRef.current?.value;
    const roomValue = inputRoomRef.current?.value;
    const timestamp = new Date().toISOString();
    if (roomValue) {
      socket.emit("send-message", {
        inputValue,
        roomValue,
        timestamp,
        twoUsers,
      });
      reply = inputValue;
    } else if (twoUsers) {
      console.log(twoUsers);

      socket.emit("send-message", {
        inputValue,
        privateRoomValue,
        timestamp,
        twoUsers,
      });
      reply = inputValue;
    }
    return dispatch(
      setChats({
        senderId: twoUsers.user2,
        receiverId: twoUsers.user1,
        roomId: privateRoomValue,
        message: inputValue,
        timestamp: timestamp,
      })
    );
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
    console.log(chats);
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server :)");
    });

    const timestamp = new Date().toISOString();

    const receiveMessageHandler = (data: any) => {
      dispatch(
        setChats({
          senderId: twoUsers.user1,
          receiverId: twoUsers.user2,
          roomId: privateRoomValue,
          message: data.inputValue,
          timestamp: timestamp,
        })
      );
      reply = replyRef.current?.innerHTML;
      replyRef.current!.innerText = data.inputValue; // ! means that it is not null
    };
    socket.on("receive-message", receiveMessageHandler);

    return () => {
      socket.off("receive-message", receiveMessageHandler);
    };
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
