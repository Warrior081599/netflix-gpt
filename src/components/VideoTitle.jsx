const VideoTitle = ({ originalTitle, overview }) => {
  return (
    <div className="pt-[15%] px-12 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-6xl font-bold ">{originalTitle}</h1>
      <p className="py-10 w-1/4 text-lg">{overview}</p>
      <button className="bg-white text-black font-bold py-4 px-12 text-xl  rounded-lg cursor-pointer  hover:bg-gray-500 hover:text-white">
        Play{" "}
        <svg
          className="inline-block  w-8 h-7 "
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <button className="bg-gray-500 text-white py-4 px-12 text-xl  rounded-lg mx-6 cursor-pointer hover:bg-white hover:text-black hover:font-bold ">
        More Info 🛈
      </button>
    </div>
  );
};

export default VideoTitle;
