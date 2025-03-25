import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../store/movieSlice";
import { NOW_PLAYING_OPTIONS } from "../utils/constants";

export const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const upcomingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        NOW_PLAYING_OPTIONS
      );
      const result = await response.json();
      dispatch(addUpcomingMovies(result.results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    upcomingMovies();
  }, []);
};
