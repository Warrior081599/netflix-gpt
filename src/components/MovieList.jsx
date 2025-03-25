import MovieCard from "./MovieCard";

const MovieList = ({ title, allMovies }) => {
  return (
    allMovies && (
      <div className="px-6 ">
        <h1 className="text-3xl  py-4 ">{title}</h1>
        <div className="flex overflow-x-auto">
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
