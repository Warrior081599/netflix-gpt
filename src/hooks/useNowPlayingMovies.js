import { useEffect } from "react";
import { NOW_PLAYING_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../store/movieSlice";

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = async () => {
    try {
      const result = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?",
        NOW_PLAYING_OPTIONS
      );
      const output = await result.json();
      dispatch(addNowPlayingMovies(output.results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    nowPlayingMovies();
  }, []);
};
