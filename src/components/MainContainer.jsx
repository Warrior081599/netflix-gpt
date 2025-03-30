import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MainContainer = () => {
  const [mainMovie, setMainMovie] = useState(null);

  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  useEffect(() => {
    if (movies) {
      //Selecting a random index
      let randomIndex = Math.floor(Math.random() * movies.length);
      setMainMovie(movies[randomIndex]);
    }
  }, [movies]);

  if (!movies || !mainMovie) {
    return;
  }

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[30%] bg-black md:pt-0 z-30">
      <VideoTitle originalTitle={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
