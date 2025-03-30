import { MOVIE_IMAGE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../store/movieSlice";

const MovieCard = ({ posterPath, title, movieId }) => {
  const dispatch = useDispatch();

  if (!posterPath) return null;

  const handleMovieClick = () => {
    dispatch(setSelectedMovie(movieId));
  };

  return (
    <div
      className="md:w-48 w-36 pr-4 cursor-pointer transition duration-300 ease-in-out hover:scale-105 active:scale-105"
      onClick={handleMovieClick}
    >
      <img alt={title} src={MOVIE_IMAGE_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
