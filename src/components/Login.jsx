import Header from "./Header";
import { useState, useRef } from "react";
import { validateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  //Refrencing the value

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  //This function is for the clicking of the sign-in/sign-up and according to that the form will change
  const handleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  //Preving the default behaviour of the form
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //Making the Sign-In/Sign-up button function
  const handleButtonClick = () => {
    if (!isSignedIn) {
      const erroInForm = validateData(
        email.current.value,
        password.current.value,
        fullName.current.value
      );
      setFormError(erroInForm);
    } else if (isSignedIn) {
      const erroInForm = validateData(
        email.current.value,
        password.current.value
      );
      setFormError(erroInForm);
    } else {
      setFormError(null);
    }

    if (formError) {
      return;
    }

    if (!isSignedIn) {
      //Sign-up

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/113576074?v=4",
          })
            .then(() => {
              navigate("/browse");
            })
            .catch((error) => {
              setFormError(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFormError(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFormError(errorCode + "-" + errorMessage);
        });
    }
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
      <form
        className="absolute w-3/12 p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-lg "
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignedIn && (
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="py-2 px-4 h-14 my-4 w-full bg-sky-300/30 rounded-b-md"
            ref={fullName}
          />
        )}
        <input
          type="email"
          placeholder="Enter your email"
          className="py-2 px-4 h-14 my-4 w-full bg-sky-300/30 rounded-b-md"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="py-2 px-4 h-14 my-4 w-full bg-sky-300/30 rounded-b-md"
          ref={password}
        />
        <p className="text-lg text-red-600 font-bold">{formError}</p>

        <button
          className="p-4 my-6 w-full bg-red-700 rounded-lg cursor-pointer "
          onClick={handleButtonClick}
        >
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-gray-400">
          {isSignedIn ? "New to Netflix?" : "Existing User?"}{" "}
          <span
            className="text-white cursor-pointer hover:underline"
            onClick={handleSignIn}
          >
            {isSignedIn ? "Sign up now." : "Please Login."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
