import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../store/userSlice";
import { LOGO_URL } from "../utils/constants";
import { toggleGptSearch } from "../store/gptSlice";
import { SUPPORTED_LANGUAGE } from "../utils/constants";
import { changeLanguage } from "../store/configSlice";
import { setMoviesByGeminiAndTmdbSearch } from "../store/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const gptSearchValue = useSelector((store) => store.gpt.showGptSearch);

  // In Header.jsx useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // ONLY navigate to /browse if we're on the login page
        if (window.location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSearch());
    dispatch(
      setMoviesByGeminiAndTmdbSearch({
        moviesNamesByGemini: null,
        moviesNamesByTmdbSearch: null,
      })
    );
  };

  const handleLanguageSelect = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute z-40  w-screen h-30 px-8 py-2 bg-gradient-to-b from-black flex flex-col md:flex-row justify-between">
      <img
        src={LOGO_URL}
        alt="netflix-logo"
        className="w-44 mx-auto md:mx-0 h-20"
      />

      {user && (
        <div className="flex p-2">
          <div className="p-2 flex">
            {gptSearchValue && (
              <select
                className="p-4 m-2 bg-gray-900 text-white"
                onChange={handleLanguageSelect}
              >
                {SUPPORTED_LANGUAGE.map((lang) => {
                  return (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div className="flex">
            <button
              onClick={handleGptSearch}
              className="bg-red-800 rounded-lg px-2 sm:px-3 md:px-5 
            h-10 sm:h-12 md:h-13 mt-5 text-xs sm:text-sm md:text-base
            cursor-pointer text-white transition duration-300 
            hover:scale-110 active:scale-110"
            >
              {gptSearchValue ? "Homepage" : "AI Recommended Movies"}
            </button>
            {/* <img
            src={user?.photoURL}
            alt="user-icon"
            className="w-12 h-12 mx-4 my-5"
          ></img> */}
            <button
              className="text-white cursor-pointer bg-red-800 
            w-[100px] sm:w-[120px] md:w-[150px] 
            h-10 sm:h-12 md:h-[50px] 
            px-2 sm:px-3 md:px-5 py-1 sm:py-1 md:py-2 
            rounded-lg mt-5 ml-2 sm:ml-3 md:ml-5 
            text-xs sm:text-sm md:text-base
            transition duration-300 ease-in-out hover:scale-110 active:scale-110"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
