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

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useAiringTodayTv();
  useOnTheAirTv();
  usePopularTv();
  useTopRatedTv();

  return (
    <div className="">
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
