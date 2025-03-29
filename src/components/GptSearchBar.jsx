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
  const { getMovieSuggestionGemini, loading, error, errorDetails } =
    useMovieSuggestionGemini();

  //Movie given by TMDB Search
  const { SearchTmdbMovie, tmdbLoading } = useSearchTmdbMovie();

  const handleGptClick = async () => {
    if (inputRef.current?.value) {
      const inputData = inputRef.current.value;

      const movieDataFromGemini = await getMovieSuggestionGemini(inputData);
      const movieDataFromGeminiArray = movieDataFromGemini.split(",");
      console.log(movieDataFromGeminiArray);

      //Here will try to call the TMDB api for all the 5 movies

      const tmdbPromise = movieDataFromGeminiArray.map((movie) =>
        SearchTmdbMovie(movie)
      );
      const tmdbResult = await Promise.all(tmdbPromise);
      console.log(tmdbResult);
      dispatch(
        setMoviesByGeminiAndTmdbSearch({
          moviesNamesByGemini: movieDataFromGeminiArray,
          moviesNamesByTmdbSearch: tmdbResult,
          loadingGemini: loading,
          errorGemini: error,
          errorDetailsGemini: errorDetails,
          loadingTmdb: tmdbLoading,
        })
      );
    }
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
