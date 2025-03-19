import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);

  const handleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <div className=" ">
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/50fcc930-ba3f-4cae-9257-9f920e30a998/web/IN-en-20250310-TRIFECTA-perspective_739387a0-ff14-44ed-a5af-36e5aa4d236e_large.jpg"
          alt="netflix-bg-img"
        />
      </div>
      <form className="absolute w-3/12 p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-lg ">
        <h1 className="font-bold text-3xl py-4">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignedIn && (
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="py-2 px-4 h-14 my-4 w-full bg-sky-300/30 rounded-b-md"
          />
        )}
        <input
          type="email"
          placeholder="Enter your email"
          className="py-2 px-4 h-14 my-4 w-full bg-sky-300/30 rounded-b-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="py-2 px-4 h-14 my-4 w-full bg-sky-300/30 rounded-b-md"
        />

        <button className="p-4 my-6 w-full bg-red-700 rounded-lg ">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-gray-400">
          New to Netflix?{" "}
          <span
            className="text-white cursor-pointer hover:underline"
            onClick={handleSignIn}
          >
            Sign up now.
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
