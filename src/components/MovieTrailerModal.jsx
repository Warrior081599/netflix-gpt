import { useEffect } from "react";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import { useSelector, useDispatch } from "react-redux";
import { clearTrailerVideo } from "../store/movieSlice";

const MovieTrailerModal = ({ movieId, onClose }) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  // Fetch trailer when movieId changes
  useMovieTrailer(movieId);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Clear trailer on unmount to prevent issues
  useEffect(() => {
    return () => {
      dispatch(clearTrailerVideo());
    };
  }, []);

  if (!trailerVideo) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="text-white text-2xl">Loading trailer...</div>
        <button
          className="absolute top-5 right-5 text-white text-4xl bg-gray-800/50 hover:bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center transition duration-300 ease-in-out hover:scale-110 active:scale-95"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <button
        className="absolute top-5 right-5 text-white text-4xl z-[60] bg-gray-800/50 hover:bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center transition duration-300 ease-in-out hover:scale-110 active:scale-95"
        onClick={onClose}
      >
        ✕
      </button>
      <div className="w-11/12 md:w-4/5 aspect-video">
        <iframe
          className="w-full h-full rounded-lg"
          src={
            "https://www.youtube.com/embed/" +
            trailerVideo?.key +
            "?&autoplay=1&mute=0"
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
};

export default MovieTrailerModal;
