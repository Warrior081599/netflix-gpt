import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NOW_PLAYING_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../store/movieSlice";
import { useSelector } from "react-redux";

export const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popular = useSelector((store) => store.movies.popularMovies);

  const popularMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        NOW_PLAYING_OPTIONS
      );
      const result = await response.json();
      dispatch(addPopularMovies(result.results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!popular) popularMovies();
  }, []);
};
