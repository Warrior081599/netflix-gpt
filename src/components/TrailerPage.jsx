import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import { useSelector, useDispatch } from "react-redux";
import { clearTrailerVideo } from "../store/movieSlice";
import Header from "./Header";

const TrailerPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  // Fetch trailer when component mounts
  useMovieTrailer(movieId);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearTrailerVideo());
    };
  }, [dispatch]);

  const handleBack = () => {
    navigate("/browse");
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="pt-24 px-4">
        <button
          onClick={handleBack}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 transition duration-300"
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
