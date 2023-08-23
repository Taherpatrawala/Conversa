import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setUsers,
  setTwoUsers,
  setChats,
  resetAll,
} from "../slices/usersSlice";
import { useEffect, useState } from "react";
import { setPrivateRoomValue } from "../slices/usersSlice";
const Users = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.userInfo.data);
  const twoUsers = useSelector((state: RootState) => state.users.twoUsers);
  const privateRoomValue = useSelector(
    (state: RootState) => state.users.privateRoomValue
  );

  const [currentChatUser, setCurrentChatUser] = useState<string>("");

  async function getUsers() {
    const { data } = await axios.get("http://localhost:8080/all-users");
    return data;
  }

  const { data, isLoading, error, isError, isFetching, refetch } = useQuery(
    "users",
    getUsers,
    {
      enabled: true,
    }
  );

  useEffect(() => {
    dispatch(
      setUsers({
        data: data,
        isLoading: isLoading,
        isError: isError,
        isFetching: isFetching,
      })
    );
  }, [data]);

  function createPrivateRoomValue(user1: string, user2: string) {
    let roomName = [user1, user2].sort().join("--with--");
    // console.log(roomName);

    return roomName;
  }

  const createPrivateRoom = async (user1: string, user2: string) => {
    dispatch(setTwoUsers({ user1: user1, user2: user2 }));
    const privateRoomValue = createPrivateRoomValue(user1, user2);
    dispatch(setPrivateRoomValue(privateRoomValue));
    console.log(privateRoomValue);

    return await axios
      .post("http://localhost:8080/create-private-room", {
        user1: user1,
        user2: user2,
        privateRoomValue: privateRoomValue,
      })
      .then((res) => {
        setCurrentChatUser(res.data.user1);
        //   console.log(currentChatUser);
      });
  };

  function handleNewPrivateRoom(user1: string) {
    if (twoUsers.user1 !== user1) {
      return dispatch(resetAll());
    }
    return;
  }

  return (
    <div className="bg-black text-white md:w-[30vw] h-[100vh]">
      {userInfo &&
        data
          ?.filter((user: any) => {
            return user.email !== userInfo.email;
          })
          .map((user: any) => {
            return (
              <div
                className={`flex flex-col justify-start items-start w-full 
                border border-[#787272] p-3 hover:bg-[#3c3c3c] transition-all
                cursor-pointer
                ${user.googleId === currentChatUser ? "bg-[#515151]" : ""}
                `}
                key={user.googleId}
                onClick={() => {
                  createPrivateRoom(user.googleId, userInfo.googleId);
                  handleNewPrivateRoom(user.googleId);
                }}
              >
                <div className={`flex`}>
                  {" "}
                  <img
                    src={`${user.profileImage}`}
                    alt="pfp"
                    className="rounded-full w-[30px] mr-3"
                  />
                  <p>{user.name}</p>
                </div>
              </div>
            );
          })}
    </div>
  );
};
export default Users;
