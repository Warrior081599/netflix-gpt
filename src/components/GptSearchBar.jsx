import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useMovieSuggestionGemini } from "../hooks/useMovieSuggestionGemini";
import { useSearchTmdbMovie } from "../hooks/useSearchTmdbMovie";
import { useDispatch } from "react-redux";
import { setMoviesByGeminiAndTmdbSearch } from "../store/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  //Movie given by Gemini
  const { getMovieSuggestionGemini, error, errorDetails } =
    useMovieSuggestionGemini();

  //Movie given by TMDB Search
  const { SearchTmdbMovie } = useSearchTmdbMovie();

  const handleGptClick = async () => {
    if (inputRef.current?.value) {
      const inputData = inputRef.current.value;

      dispatch(
        setMoviesByGeminiAndTmdbSearch({
          loadingGemini: true,
          loadingTmdb: true,
        })
      );

      const movieDataFromGemini = await getMovieSuggestionGemini(inputData);
      const movieDataFromGeminiArray = movieDataFromGemini.split(",");

      //Here will try to call the TMDB api for all the 5 movies

      const tmdbPromise = movieDataFromGeminiArray.map((movie) =>
        SearchTmdbMovie(movie)
      );
      const tmdbResult = await Promise.all(tmdbPromise);

      dispatch(
        setMoviesByGeminiAndTmdbSearch({
          moviesNamesByGemini: movieDataFromGeminiArray,
          moviesNamesByTmdbSearch: tmdbResult,
          loadingGemini: false,
          errorGemini: error,
          errorDetailsGemini: errorDetails,
          loadingTmdb: false,
        })
      );
    }
    inputRef.current.value = "";
  };

  return (
    <div className="pt-[50%] md:pt-[10%] flex justify-center  ">
      <form
        className=" w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={inputRef}
          className="p-4 m-4 col-span-7 md:col-span-9 text-gray-950 bg-white"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="md:col-span-3 col-span-5 m-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer transition duration-300 ease-in-out hover:scale-105 active:scale-108"
          onClick={handleGptClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
