import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    airingTodayTv: null,
    onTheAirTv: null,
    popularTv: null,
    topRatedTv: null,
    selectedMovieId: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },

    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },

    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addAiringTodayTv: (state, action) => {
      state.airingTodayTv = action.payload;
    },
    addOnTheAirTv: (state, action) => {
      state.onTheAirTv = action.payload;
    },
    addPopularTv: (state, action) => {
      state.popularTv = action.payload;
    },
    addTopRatedTv: (state, action) => {
      state.topRatedTv = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovieId = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovieId = null;
    },
    clearTrailerVideo: (state) => {
      state.trailerVideo = null;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addAiringTodayTv,
  addOnTheAirTv,
  addPopularTv,
  addTopRatedTv,
  setSelectedMovie,
  clearSelectedMovie,
  clearTrailerVideo,
} = movieSlice.actions;

export default movieSlice.reducer;
