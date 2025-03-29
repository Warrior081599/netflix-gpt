import { NOW_PLAYING_OPTIONS } from "../utils/constants";
import { useState } from "react";

export const useSearchTmdbMovie = () => {
  const [tmdbLoading, setTmdbLoading] = useState(false);
  const SearchTmdbMovie = async (movie) => {
    setTmdbLoading(true);
    try {
      const result = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        NOW_PLAYING_OPTIONS
      );
      const output = await result.json();
      return output;
    } catch (err) {
      console.log(err);
    } finally {
      setTmdbLoading(false);
    }
  };

  return { SearchTmdbMovie, tmdbLoading };
};
