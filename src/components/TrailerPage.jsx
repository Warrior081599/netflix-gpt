import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import { useSelector, useDispatch } from "react-redux";
import { clearTrailerVideo } from "../store/movieSlice";
import Header from "./Header";

const TrailerPage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  useMovieTrailer(movieId);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const navigate = useNavigate();

  // Log the movieId to confirm it's being extracted correctly
  console.log("TrailerPage mounted with movieId:", movieId);

  // Fetch trailer when component mounts
  useEffect(() => {
    console.log("Fetching trailer for movie ID:", movieId);
    // No cleanup necessary in this effect
  }, [movieId]);

  // Use a separate effect for cleanup
  useEffect(() => {
    return () => {
      console.log("TrailerPage unmounting, cleaning up");
      dispatch(clearTrailerVideo());
    };
  }, [dispatch]);

  if (!movieId) {
    return (
      <div className="bg-black min-h-screen text-white p-24">
        <p>Missing movie ID parameter</p>
        <Link to="/browse" className="text-blue-500 underline">
          Back to Browse
        </Link>
      </div>
    );
  }

  // Attempt to fetch the trailer

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="pt-28 sm:pt-28 md:pt-24 px-4">
        <button
          onClick={() => navigate("/browse")}
          className="text-white bg-red-600 hover:bg-red-700 font-bold 
              py-2 px-3 text-sm sm:text-base md:text-lg 
              rounded mb-4 transition duration-300 cursor-pointer
              relative z-50 mt-20 ml-10 sm:mt-2 md:mt-0 "
        >
          ← Back to Browse
        </button>

        {!trailerVideo ? (
          <div className="flex justify-center items-center h-[60vh]">
            <p className="text-white text-xl">Loading trailer...</p>
          </div>
        ) : (
          <div className="w-full aspect-video max-w-5xl mx-auto">
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerPage;
