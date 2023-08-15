import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
const Users = () => {
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

  console.log(data);

  return (
    <div className="bg-black text-white md:w-[30vw] absolute left-0 h-[100vh]">
      {data?.map((user: any) => {
        return (
          <div className="flex flex-col justify-start items-center">
            <div className="flex">
              {" "}
              <img
                src={`${user.profileImage}`}
                alt="pfp"
                className="rounded-full w-[30px]"
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
