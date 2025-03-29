import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useMovieSuggestionGemini } from "../hooks/useMovieSuggestionGemini";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const inputRef = useRef(null);

  const searchText = inputRef.current.value ? inputRef.current.value : " ";
  const movieSuggestionFromGemini = useMovieSuggestionGemini(searchText);

  const handleGptClick = () => {
    movieSuggestionFromGemini();
  };

  return (
    <div className="pt-[10%] flex justify-center  ">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={inputRef}
          className="p-4 m-4 col-span-9 text-gray-950 bg-white"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer"
          onClick={handleGptClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
