import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
const Users = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo.data;
  });
  async function getUsers() {
    const { data } = await axios.get("http://localhost:8080/all-users");
    return data;
  }

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery(
    "users",
    getUsers,
    {
      enabled: true,
    }
  );

  return (
    <div className="bg-black text-white md:w-[30vw] h-[100vh]">
      {userInfo &&
        data
          ?.filter((user: any) => {
            return user.email !== userInfo.email;
          })
          .map((user: any) => {
            return (
              <div className="flex flex-col justify-start items-start w-full border border-[#787272] p-3 hover:bg-[#3c3c3c] transition-all">
                <div className="flex">
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
