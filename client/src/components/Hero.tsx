import { useEffect, useState } from "react";
import Google from "../assets/Google.svg";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import grill from "../assets/ideogram(9).jpeg";
import polkadots from "../assets/polka-dots.svg";

const Hero = () => {
  const [loading, setLoading] = useState(false);
  function handleGoogleLogin() {
    setLoading(true);
    setTimeout(() => {
      window.location.href = `${import.meta.env.VITE_SERVER_LINK}/google`;
    }, 0);
  }
  if (useLocation().pathname !== "/") {
    setLoading(false);
    console.log("loading is", loading);
  }

  useEffect(() => {
    console.log("loading is", loading);
    setLoading(false);
    return () => {
      setLoading(false);
    };
  }, []);
  return (
    <div
      className="flex flex-col md:flex-row justify-center md:justify-normal items-center h-screen "
      style={{ backgroundImage: `url(${polkadots})` }}
    >
      <div className="flex justify-center items-center">
        <img
          src={grill}
          alt="Conversa"
          className="h-[50vh]  md:w-full md:h-screen object-contain md:object-cover
          rounded-full md:rounded-none z-20"
        />
      </div>
      <div className="flex justify-center items-center md:w-[50vw]">
        <button
          onClick={handleGoogleLogin}
          className="text-white bg-[#313131] mt-3 w-[200px] p-2 rounded-lg flex justify-center items-center"
        >
          <img src={Google} alt="G" className="w-[30px] mr-4 " />
          <p>Sign Up with Google</p>
        </button>
      </div>
      {loading && (
        <div className="absolute top-0 left-0">
          <Loading />
        </div>
      )}
    </div>
  );
};
export default Hero;
