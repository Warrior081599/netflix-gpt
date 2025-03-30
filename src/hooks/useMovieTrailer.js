import { NOW_PLAYING_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../store/movieSlice";
import { useEffect } from "react";

export const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?`,
          NOW_PLAYING_OPTIONS
        );

        const response = await data.json();
        const filterData = response.results.filter(
          (video) => video.type === "Trailer"
        );
        const trailer = filterData.length ? filterData[0] : response.results[0];

        dispatch(addTrailerVideo(trailer));
      } catch (err) {
        console.log("Error: ", err);
      }
    };

    getMovies();
  }, [movieId, dispatch]);
};
