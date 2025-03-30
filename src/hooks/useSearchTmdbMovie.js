import { NOW_PLAYING_OPTIONS } from "../utils/constants";

export const useSearchTmdbMovie = () => {
  const SearchTmdbMovie = async (movie) => {
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
    }
  };

  return { SearchTmdbMovie };
};
