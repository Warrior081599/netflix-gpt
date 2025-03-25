import { MOVIE_IMAGE_URL } from "../utils/constants";

const MovieCard = ({ posterPath, title }) => {
  return (
    <div className="w-48 pr-4 cursor-pointer">
      <img alt={title} src={MOVIE_IMAGE_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
