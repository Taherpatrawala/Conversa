import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { RootState } from "../store/store";
import { setChats } from "../slices/usersSlice";
import { useEffect, useRef } from "react";

const Chats = () => {
  const dispatch = useDispatch();
  const users: any = useSelector((state: RootState) => state.users.data.data);
  const twoUsers: any = useSelector((state: RootState) => state.users.twoUsers);
  const chats: any = useSelector((state: RootState) => state.users.chats);
  const privateRoomValue: string = useSelector(
    (state: RootState) => state.users.privateRoomValue
  );

  const chatContainerRef = useRef<HTMLDivElement>(null);

  async function getMessages() {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_LINK}/get-private-room-messages`,
      {
        user1: twoUsers.user1,
        user2: twoUsers.user2,
        privateRoomValue,
      }
    );

    return data.messages;
  }

  const { data, isFetching, isLoading, isError, error, refetch } = useQuery(
    "messages",
    getMessages,
    {
      enabled: true,
    }
  );

  useEffect(() => {
    if (data && chats.length < 2) {
      data.forEach((mess: object) => {
        dispatch(setChats(mess));
      });
    }
  }, [data]);

  console.log("data ", data);
  console.log("Chats ", chats);

  useEffect(() => {
    if (twoUsers.user1) {
      refetch();
    }
  }, [twoUsers.user1]);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, [chats]);

  return (
    <div
      className="h-[100vh] overflow-scroll  overflow-x-clip"
      ref={chatContainerRef}
    >
      <div className="flex h-min w-[70vw] overflow-clip bg-[#000000] cursor-pointer p-1 absolute top-0">
        {twoUsers && users
          ? users
              .filter((user: any) => {
                return user.googleId === twoUsers.user1;
              })
              .map((user: any) => {
                return (
                  <div
                    className="flex justify-start items-center gap-4 pl-3"
                    key={user.googleId}
                  >
                    <img
                      src={`${user.profileImage}`}
                      alt=""
                      className="w-[40px] rounded-full"
                    />
                    <p className="text-xl text-white">{user.name}</p>
                  </div>
                );
              })
          : null}
      </div>
      <div className="flex flex-col md:mb-24 pt-6">
        {chats.map((chat: any) => {
          return (
            <div
              className={`w-full flex flex-col 
            ${chat.senderId === twoUsers.user2 ? " items-end" : "items-start"}
            `}
              key={chat.timestamp}
            >
              <p
                className={`${
                  chat.senderId === twoUsers.user2
                    ? "bg-[#b6dca0] justify-self-end rounded-tr-sm"
                    : "bg-[#ade9ee] rounded-tl-sm"
                } w-[13vw] rounded-xl p-2 m-1.5`}
              >
                {chat.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Chats;
