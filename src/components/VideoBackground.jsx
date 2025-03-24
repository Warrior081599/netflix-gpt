import { useMovieTrailer } from "../hooks/useMovieTrailer";
const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);

  return <div></div>;
};

export default VideoBackground;
