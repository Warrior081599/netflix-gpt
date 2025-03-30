import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularTv } from "../store/movieSlice";
import { NOW_PLAYING_OPTIONS } from "../utils/constants";
import { useSelector } from "react-redux";

export const usePopularTv = () => {
  const dispatch = useDispatch();
  const popular = useSelector((store) => store.movies.popularTv);

  const popularTv = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        NOW_PLAYING_OPTIONS
      );
      const result = await response.json();
      dispatch(addPopularTv(result.results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!popular) popularTv();
  }, []);
};
