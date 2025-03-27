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

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
        console.log(error);
      });
  };

  const gptSearchValue = useSelector((store) => store.gpt.showGptSearch);

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
        navigate("/browse");
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
  };

  const handleLanguageSelect = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img src={LOGO_URL} alt="netflix-logo" className="w-44" />

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
          <button
            onClick={handleGptSearch}
            className="bg-purple-700 rounded-lg  px-8  m-2 cursor-pointer  text-white"
          >
            {gptSearchValue ? "Homepage" : "Gpt Search"}
          </button>
          <img
            src={user?.photoURL}
            alt="user-icon"
            className="w-12 h-12 mx-4"
          ></img>
          <button
            className="font-bold text-white cursor-pointer "
            onClick={handleSignOut}
          >
            (Sign-Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
