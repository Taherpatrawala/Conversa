import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { RootState } from "../store/store";
import { setChats } from "../slices/usersSlice";
import { useEffect } from "react";

const Chats = () => {
  const dispatch = useDispatch();
  const twoUsers: any = useSelector((state: RootState) => state.users.twoUsers);
  const chats: any = useSelector((state: RootState) => state.users.chats);
  const privateRoomValue: string = useSelector(
    (state: RootState) => state.users.privateRoomValue
  );

  async function getMessages() {
    const { data } = await axios.post(
      "http://localhost:8080/get-private-room-messages",
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
      enabled: false,
    }
  );

  useEffect(() => {
    if (data) {
      data.forEach((mess: object) => {
        dispatch(setChats(mess));
      });
    }
  }, [data]);

  console.log("data ", data);
  console.log("Chats ", chats);

  return (
    <div className="h-auto">
      <div onClick={() => refetch()}>Chats</div>
      <div className="flex flex-col">
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
                    ? "bg-[#b6dca0] justify-self-end"
                    : "bg-[#ade9ee]"
                } w-[13vw] rounded-md p-2 m-1.5`}
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
