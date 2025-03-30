import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addOnTheAirTv } from "../store/movieSlice";
import { NOW_PLAYING_OPTIONS } from "../utils/constants";
import { useSelector } from "react-redux";

export const useOnTheAirTv = () => {
  const dispatch = useDispatch();
  const airTv = useSelector((store) => store.movies.onTheAirTv);

  const onAirTv = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
        NOW_PLAYING_OPTIONS
      );
      const result = await response.json();
      dispatch(addOnTheAirTv(result.results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!airTv) onAirTv();
  }, []);
};
