import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo;
  });
  const navigate = useNavigate();

  async function LogOut() {
    await axios.get(`${import.meta.env.VITE_SERVER_LINK}/logout`, {
      withCredentials: true,
    });
    navigate("/");
  }

  return (
    <div className="flex justify-end items-center  bg-gradient-to-tr from-[#302c2c] to-[#000000]">
      {userInfo.data == null && <button className="text-white">Log in</button>}
      {userInfo.data && (
        <div className="flex items-center">
          <img
            src={`${userInfo.data.profileImage}`}
            alt="pfp"
            className="rounded-full w-[50px] m-1"
          />
          <p className="text-2xl  text-white m-1 lg:mr-8">
            {userInfo.data.name}
          </p>
          <button
            onClick={() => LogOut()}
            className="text-xl font-semibold font-mono text-white ml-2 lg:mr-8 border-2 border-[#c9333a] bg-[#d73939] rounded-lg"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
export default Navbar;
