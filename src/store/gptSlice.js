import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    moviesByGemini: null,
    moviesByTmdbSearch: null,
    geminiLoading: false,
    geminiError: false,
    geminiErrorDetails: null,
    tmdbLoading: false,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    setMoviesByGeminiAndTmdbSearch: (state, action) => {
      const {
        moviesNamesByGemini,
        moviesNamesByTmdbSearch,
        loadingGemini,
        errorGemini,
        errorDetailsGemini,
        loadingTmdb,
      } = action.payload;
      state.moviesByGemini = moviesNamesByGemini;
      state.moviesByTmdbSearch = moviesNamesByTmdbSearch;
      state.geminiLoading = loadingGemini;
      state.geminiError = errorGemini;
      state.geminiErrorDetails = errorDetailsGemini;
      state.tmdbLoading = loadingTmdb;
    },
  },
});

export const { toggleGptSearch, setMoviesByGeminiAndTmdbSearch } =
  gptSlice.actions;
export default gptSlice.reducer;
