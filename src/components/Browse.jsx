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
import { useDispatch, useSelector } from "react-redux";
import GptSearch from "./GptSearch";
import MovieTrailerModal from "./MovieTrailerModal";
import { clearSelectedMovie, clearTrailerVideo } from "../store/movieSlice";

const Browse = () => {
  const dispatch = useDispatch();

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useAiringTodayTv();
  useOnTheAirTv();
  usePopularTv();
  useTopRatedTv();

  const gptSearchValue = useSelector((store) => store.gpt.showGptSearch);
  const selectedMovieId = useSelector((store) => store.movies.selectedMovieId);

  const handleCloseModal = () => {
    dispatch(clearSelectedMovie());
    dispatch(clearTrailerVideo());
  };

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
      {selectedMovieId && (
        <MovieTrailerModal
          movieId={selectedMovieId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Browse;
