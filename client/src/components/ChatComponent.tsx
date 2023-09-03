import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../slices/userInfoSlice";
import { RootState } from "../store/store";
import { setChats } from "../slices/usersSlice";
import Chats from "./Chats";
import { setActiveUsers } from "../slices/activeUsersSlice";
import EmojiPicker from "emoji-picker-react";
import Emojis from "./Emojis";
import paperplane from "../assets/paperplane.svg";
import smiley from "../assets/smiley.svg";

const ChatComponent = () => {
  const socket: any = useRef();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRoomRef = useRef<HTMLInputElement>(null);
  const replyRef = useRef<HTMLHeadingElement>(null);

  const dispatch = useDispatch();

  const twoUsers: any = useSelector((state: RootState) => state.users.twoUsers);
  const activeUsers: any = useSelector(
    (state: RootState) => state.activeUsers.activeUsersData
  );
  const privateRoomValue: any = useSelector(
    (state: RootState) => state.users.privateRoomValue
  );

  const [emojiPicker, setEmojiPicker] = useState(false);

  let reply;

  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_SERVER_LINK}`);
    socket.current.on("connect", () => {
      console.log("Connected to the server :)");
    });

    socket?.current.on("online-users", (data: any) => {
      dispatch(setActiveUsers(data));
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (twoUsers) {
      socket.current.emit("join-private-room", privateRoomValue);
    } else {
      console.log(twoUsers);
    }
  }, [twoUsers]);

  function handleClick() {
    const inputValue = inputRef.current?.value;
    const roomValue = inputRoomRef.current?.value;
    const timestamp = new Date().toISOString();
    if (roomValue) {
      socket.current.emit("send-message", {
        inputValue,
        roomValue,
        timestamp,
        twoUsers,
      });
      reply = inputValue;
    } else if (twoUsers) {
      console.log(twoUsers);

      socket.current.emit("send-message", {
        inputValue,
        privateRoomValue,
        timestamp,
        twoUsers,
      });
      reply = inputValue;
    }
    inputRef.current!.value = "";
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
        .get(`${import.meta.env.VITE_SERVER_LINK}/protected`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("data is", res.data);
          dispatch(setUserInfo(res.data));
          //    console.log(setUserInfo(res.data));
        });
    })();
  }, []);

  useEffect(() => {
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
      replyRef.current!.innerText = data.inputValue; // ! means that it is not null
      reply = replyRef.current?.innerHTML;
    };
    socket.current.on("receive-message", receiveMessageHandler);

    return () => {
      socket.current.off("receive-message", receiveMessageHandler);
    };
  }, [socket]);

  return (
    <div className="min-h-screen w-[70vw] overflow-clip bg-[#c73232]">
      {emojiPicker ? (
        <div className="fixed bottom-1/2 top-1/4 right-1/2 left-1/2 ">
          <EmojiPicker
            autoFocusSearch={false}
            height={350}
            lazyLoadEmojis={true}
          />
        </div>
      ) : null}
      <div className="flex justify-center  mt-6 fixed bottom-5">
        <input
          type="text"
          placeholder="message..."
          ref={inputRef} //ref means it is a reference to the input element unlike value which is the value of the input element
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
          className="p-5 w-[50vw] rounded-bl-md rounded-tl-md ml-8 border-none outline-none"
        />
        <button
          className="bg-white px-2 hover:bg-[#dcdada] transition-all duration-300"
          onClick={() => {
            console.log(activeUsers);
            setEmojiPicker(!emojiPicker);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
        </button>
        <button
          onClick={handleClick}
          className="bg-white rounded-tr-md rounded-br-md pr-2 pl-2 hover:bg-[#dcdada] transition-all duration-300"
        >
          <img src={paperplane} alt="send" className="w-6 h-6" />
        </button>
      </div>

      {twoUsers.user1 ? (
        <Chats />
      ) : (
        <div className="h-full w-full flex justify-center items-center -z-40">
          Select any user to get started
        </div>
      )}
    </div>
  );
};
export default ChatComponent;
