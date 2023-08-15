import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Navbar = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo;
  });

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
          <button className="text-xl ml-2">Log out</button>
        </div>
      )}
    </div>
  );
};
export default Navbar;
