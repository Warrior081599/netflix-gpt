const VideoTitle = ({ originalTitle, overview }) => {
  return (
    <div className="pt-40 px-12">
      <h1 className="text-6xl font-bold ">{originalTitle}</h1>
      <p className="py-10 w-1/4 text-lg">{overview}</p>
      <button className="bg-gray-500 text-white py-4 px-12 text-xl backdrop-opacity-50 rounded-lg cursor-pointer ">
        Play ▷
      </button>
      <button className="bg-gray-500 text-white py-4 px-12 text-xl backdrop-opacity-50 rounded-lg mx-6 cursor-pointer">
        More Info 🛈
      </button>
    </div>
  );
};

export default VideoTitle;
