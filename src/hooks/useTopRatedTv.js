import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedTv } from "../store/movieSlice";
import { NOW_PLAYING_OPTIONS } from "../utils/constants";

export const useTopRatedTv = () => {
  const dispatch = useDispatch();
  const topTv = useSelector((store) => store.movies.topRatedTv);

  const topRatedTv = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        NOW_PLAYING_OPTIONS
      );
      const result = await response.json();
      dispatch(addTopRatedTv(result.results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!topTv) topRatedTv();
  }, []);
};
