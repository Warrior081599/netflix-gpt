import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies && (
      <div className=" bg-black">
        <div className="md:-mt-50 mt-0 pl-4 relative md:pl-12  z-20">
          <MovieList
            title={"Now Playing"}
            allMovies={movies?.nowPlayingMovies}
          />
          <MovieList
            title={"Popular Movies"}
            allMovies={movies?.popularMovies}
          />
          <MovieList
            title={"Top Rated Movies"}
            allMovies={movies?.topRatedMovies}
          />

          <MovieList
            title={"Upcoming Moivies"}
            allMovies={movies?.upcomingMovies}
          />

          <MovieList
            title={"Tv Shows Airing Today"}
            allMovies={movies?.airingTodayTv}
          />

          <MovieList title={"On Air Tv Shows"} allMovies={movies?.onTheAirTv} />

          <MovieList title={"Popular Tv Shows"} allMovies={movies?.popularTv} />

          <MovieList
            title={"Top Rated Tv Shows"}
            allMovies={movies?.topRatedTv}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
