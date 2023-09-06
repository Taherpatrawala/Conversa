import { useEffect, useState } from "react";
import Google from "../assets/Google.svg";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";

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
    return () => {
      setLoading(false);
    };
  }, []);
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="text-white bg-[#313131] w-[200px] p-2 rounded-lg flex justify-center items-center translate-y-6"
      >
        <img src={Google} alt="G" className="w-[30px] mr-4" />
        <p>Sign Up with Google</p>
      </button>
      {loading && (
        <div className="absolute top-0 left-0">
          <Loading />
        </div>
      )}
    </div>
  );
};
export default Hero;
