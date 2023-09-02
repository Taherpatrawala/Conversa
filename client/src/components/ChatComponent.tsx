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
      <div className="flex justify-center  mt-6 fixed bottom-5">
        {emojiPicker ? (
          <EmojiPicker
            autoFocusSearch={false}
            width="50%"
            height={350}
            lazyLoadEmojis={true}
          />
        ) : null}
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
        <button
          onClick={() => {
            console.log(activeUsers);
            setEmojiPicker(!emojiPicker);
          }}
        >
          Online
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
