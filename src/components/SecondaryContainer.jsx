import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies && (
      <div>
        <MovieList title={"Now Playing"} allMovies={movies?.nowPlayingMovies} />
      </div>
    )
  );
};

export default SecondaryContainer;
