import { useEffect } from "react";
import { NOW_PLAYING_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../store/movieSlice";
import { useSelector } from "react-redux";

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const playingMovies = useSelector((store) => store.movies.nowPlayingMovies);

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
    if (!playingMovies) nowPlayingMovies();
  }, []);
};
