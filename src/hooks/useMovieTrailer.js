import { NOW_PLAYING_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../store/movieSlice";

export const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovies = async () => {
    try {
      const data = await fetch(
        `"https://api.themoviedb.org/3/movie/${movieId}/videos?"`,
        NOW_PLAYING_OPTIONS
      );
    } catch (err) {
      console.log("Error: ", err);
    }
    const response = await data.json();
    console.log(response);
  };

  getMovies();
};
