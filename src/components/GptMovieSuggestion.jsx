import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import { ClipLoader } from "react-spinners";

const GptMovieSuggestion = () => {
  const {
    moviesByGemini,
    moviesByTmdbSearch,
    geminiLoading,
    geminiError,
    geminiErrorDetails,
    tmdbLoading,
  } = useSelector((store) => store.gpt);

  if (!geminiLoading && !tmdbLoading && !moviesByGemini && !geminiError) {
    return null;
  }

  return (
    <div className="bg-black/85 text-white p-2 bg-opacity-40 mt-[2%]">
      {geminiLoading || tmdbLoading ? (
        <div className="flex flex-col items-center p-8 bg-black/85 w-full h-full">
          <p>Finding your perfect Movies....</p>
          <ClipLoader
            color="#E50914"
            loading={geminiLoading || tmdbLoading}
            size={45}
            aria-label="Loading Spinner"
          />
        </div>
      ) : geminiError ? (
        <h2>{`Error: ${geminiErrorDetails} `}</h2>
      ) : (
        moviesByGemini &&
        moviesByTmdbSearch &&
        moviesByGemini?.map((movieName, index) => (
          <MovieList
            title={movieName}
            key={movieName}
            allMovies={moviesByTmdbSearch[index].results}
          />
        ))
      )}
    </div>
  );
};

export default GptMovieSuggestion;
