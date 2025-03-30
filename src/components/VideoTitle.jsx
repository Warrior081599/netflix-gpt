const VideoTitle = ({ originalTitle, overview }) => {
  return (
    <div className=" pt-[15%] px-6 md:px-12 absolute text-white bg-gradient-to-r from-black w-screen aspect-video ">
      <h1 className="md:text-6xl font-bold ">{originalTitle}</h1>
      <p className="hidden md:inline-block py-10 w-1/4 text-lg">{overview}</p>
      <div className="my-4 md:m-0">
        <button className="hidden md:inline-block bg-white  text-black font-bold py-4 px-12 text-xl  rounded-lg cursor-pointer  hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out hover:scale-110 active:scale-110">
          Play{" "}
          <svg
            className="inline-block  w-8 h-7 "
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <button className="hidden md:inline-block bg-gray-500 text-white py-4 px-12 text-xl  rounded-lg mx-6 cursor-pointer hover:bg-white hover:text-black hover:font-bold transition duration-300 ease-in-out hover:scale-110 active:scale-110 ">
          More Info 🛈
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
