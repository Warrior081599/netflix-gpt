import { MOVIE_IMAGE_URL } from "../utils/constants";

import { useNavigate } from "react-router-dom";

const MovieCard = ({ posterPath, title, movieId }) => {
  const navigate = useNavigate();

  if (!posterPath) return null;

  const handleMovieClick = () => {
    navigate(`/watch/${movieId}`);
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
