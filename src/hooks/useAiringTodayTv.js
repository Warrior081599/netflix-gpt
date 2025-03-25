import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAiringTodayTv } from "../store/movieSlice";
import { NOW_PLAYING_OPTIONS } from "../utils/constants";

export const useAiringTodayTv = () => {
  const dispatch = useDispatch();

  const airingToday = async () => {
    try {
      const result = await fetch(
        "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
        NOW_PLAYING_OPTIONS
      );
      const response = await result.json();
      dispatch(addAiringTodayTv(response.results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    airingToday();
  }, []);
};
