import Google from "../assets/Google.svg";

const Hero = () => {
  function handleGoogleLogin() {
    window.location.href = `${import.meta.env.VITE_SERVER_LINK}/google`;
  }
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="text-white bg-[#313131] w-[200px] p-2 rounded-lg flex justify-center translate-y-6"
      >
        <img src={Google} alt="G" className="w-[30px] mr-4" />
        <p>Sign Up with Google</p>
      </button>
    </div>
  );
};
export default Hero;
