import MovieCard from "./MovieCard";

const MovieList = ({ title, allMovies }) => {
  return (
    allMovies && (
      <div className="px-6 text-white">
        <h1 className="md:text-3xl  text-xl py-4 ">{title}</h1>
        <div className=" flex overflow-x-auto scrollbar-hide">
          <div className="flex">
            {allMovies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  posterPath={movie.poster_path}
                  title={movie.title}
                />
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieList;
