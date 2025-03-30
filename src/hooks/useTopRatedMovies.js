import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NOW_PLAYING_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../store/movieSlice";
import { useSelector } from "react-redux";

export const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topMovies = useSelector((store) => store.movies.topRatedMovies);

  const topRatedMovie = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        NOW_PLAYING_OPTIONS
      );
      const result = await response.json();
      dispatch(addTopRatedMovies(result.results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!topMovies) topRatedMovie();
  }, []);
};
