import { MOVIE_IMAGE_URL } from "../utils/constants";

const MovieCard = ({ posterPath, title }) => {
  if (!posterPath) return null;
  return (
    <div className="md:w-48 w-36 pr-4 cursor-pointer">
      <img alt={title} src={MOVIE_IMAGE_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
