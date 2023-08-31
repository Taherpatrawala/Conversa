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
  const activeUsers: any = useSelector(
    (state: RootState) => state.activeUsers.activeUsersData
  );
  const privateRoomValue = useSelector(
    (state: RootState) => state.users.privateRoomValue
  );

  const [currentChatUser, setCurrentChatUser] = useState<string>("");
  const [activeFlag, setActiveFlag] = useState(false);

  async function getUsers() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_LINK}/all-users`,
      { withCredentials: true }
    );
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

  useEffect(() => {
    if (activeUsers && activeUsers.length > 0) {
      setActiveFlag(true);
    } else {
      setActiveFlag(false);
    }
  }, [activeUsers]);

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
      .post(`${import.meta.env.VITE_SERVER_LINK}/create-private-room`, {
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
    <div className="bg-black text-white md:w-[30vw] h-[100vh] p-1">
      {userInfo &&
        data
          ?.filter((user: any) => {
            return user.email !== userInfo.email;
          })
          .map((user: any) => {
            return (
              <div
                className={`flex flex-col justify-start items-start w-full 
                border border-[#454545] p-3 m-2 ml-0 hover:bg-[#3c3c3c] transition-all
                cursor-pointer rounded-lg
                ${user.googleId === currentChatUser ? "bg-[#515151]" : ""}
                `}
                key={user.googleId * 2}
                onClick={() => {
                  createPrivateRoom(user.googleId, userInfo.googleId);
                  handleNewPrivateRoom(user.googleId);
                }}
              >
                <div className={`flex justify-center items-center`}>
                  {" "}
                  <img
                    src={`${user.profileImage}`}
                    alt="pfp"
                    className="rounded-full w-[30px] mr-3"
                  />
                  <p>{user.name}</p>
                  {activeUsers?.map((activeUser: any) => {
                    if (activeUser.googleId === user.googleId) {
                      return (
                        <div
                          key={user.googleId}
                          className="w-[12px] h-[12px] bg-green-400 rounded-full m-1"
                        ></div>
                      );
                    }
                    return;
                  })}
                </div>
              </div>
            );
          })}
    </div>
  );
};
export default Users;
