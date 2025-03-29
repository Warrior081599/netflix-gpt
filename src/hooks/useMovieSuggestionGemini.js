import { useState } from "react";
import model from "../utils/gemini";

export const useMovieSuggestionGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  const getMovieSuggestionGemini = async (searchText) => {
    if (!searchText.trim()) {
      return; // Stop if input is empty
    }

    // Construct the query for Gemini
    const geminiQuery =
      "Act as a movie recommendation system and suggest movies for the query: " +
      searchText +
      ". Only give me names of 5 movies, comma separated like the given result ahead. Example Result: Avatar, Sholay, Bahubali, Singham, Once upon a time in Mumbai";

    try {
      // --- Make the API Call using 'model' ---
      setLoading(true);

      const result = await model.generateContent(geminiQuery);
      const response = await result.response;
      const text = await response.text();

      return text;
    } catch (err) {
      // --- Basic error logging ---
      console.error("!!! Error calling Gemini API !!!");
      console.error(err);
      setError(true);
      setErrorDetails(err);
      setLoading(false);
    } finally {
      setLoading(false);
      setError(false);
      setErrorDetails(null);
    }
  };

  return { getMovieSuggestionGemini, loading, error, errorDetails };
};
