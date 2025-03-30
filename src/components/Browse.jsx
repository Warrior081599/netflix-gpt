import Header from "./Header";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import { useAiringTodayTv } from "../hooks/useAiringTodayTv";
import { useOnTheAirTv } from "../hooks/useOnTheAirTv";
import { usePopularTv } from "../hooks/usePopularTv";
import { useTopRatedTv } from "../hooks/useTopRatedTv";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";

const Browse = () => {
  // Fetch all movie data with custom hooks
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useAiringTodayTv();
  useOnTheAirTv();
  usePopularTv();
  useTopRatedTv();

  const gptSearchValue = useSelector((store) => store.gpt.showGptSearch);

  return (
    <div className="">
      <Header />
      {!gptSearchValue && (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      {gptSearchValue && <GptSearch />}
    </div>
  );
};

export default Browse;
