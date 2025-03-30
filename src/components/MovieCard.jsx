import { MOVIE_IMAGE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({ posterPath, title, movieId }) => {
  if (!posterPath) return null;

  return (
    <Link
      to={`/watch/${movieId}`}
      className="block md:w-48 w-36 pr-4 cursor-pointer transition duration-300 ease-in-out hover:scale-105 active:scale-105"
      style={{ textDecoration: "none" }}
    >
      <img alt={title} src={MOVIE_IMAGE_URL + posterPath} className="w-full" />
    </Link>
  );
};

export default MovieCard;
