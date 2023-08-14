import axios from "axios";

const Hero = () => {
  function handleGoogleLogin() {
    window.open("http://localhost:8080/google", "self");
  }
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="text-white bg-[#313131] w-[200px] p-2 rounded-lg flex justify-center translate-y-6"
      >
        <img
          src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
          alt=""
          className="w-[30px] mr-4"
        />
        <p>Sign Up with Google</p>
      </button>
    </div>
  );
};
export default Hero;
