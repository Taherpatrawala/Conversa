import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Navbar = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo;
  });

  function LogOut(name: string) {
    return (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);
  }

  return (
    <div className="flex justify-end items-center m-1 lg:mr-8">
      {userInfo.data == null && <button>Log in</button>}
      {userInfo.data && (
        <div className="flex items-center">
          <img
            src={`${userInfo.data.profileImage}`}
            alt="pfp"
            className="rounded-full w-[50px]"
          />
          <p className="text-2xl m-1">{userInfo.data.name}</p>
          <button
            onClick={() => LogOut("connect.sid")}
            className="text-xl font-semibold font-mono text-white ml-2 border-2 border-[#c9333a] bg-[#d73939] rounded-lg"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
export default Navbar;
