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

  return (
    <div className="bg-black text-white p-2 bg-opacity-60">
      {geminiLoading || tmdbLoading ? (
        <ClipLoader
          color="#E50914"
          loading={geminiLoading || tmdbLoading}
          size={45}
          aria-label="Loading Spinner"
        />
      ) : geminiError ? (
        <h2>{`Error: ${geminiErrorDetails} `}</h2>
      ) : (
        moviesByTmdbSearch?.map((movies, index) => (
          <MovieList
            title={moviesByGemini[index]}
            key={moviesByGemini[index]}
            allMovies={movies[index]}
          />
        ))
      )}
    </div>
  );
};

export default GptMovieSuggestion;
