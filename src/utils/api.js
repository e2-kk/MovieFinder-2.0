import axios from "axios";
import { config } from "../config";

var api_key = config.API_KEY;

export const getMoviesCategories = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`
    );
    return response.data.genres; // Returns a Promise that resolves to genres
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array in case of error
  }
};

export const getAllMovies = async (pageNum) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&primary_release_date.gte=2000-01-01&primary_release_date.lte=2025-12-31&with_original_language=en&vote_count.gte=150.0&page=${pageNum}`
    );
    return response.data; // Returns a Promise that resolves to all movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};

export const getMoviesWithinCategory = async (category, pageNum) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${category}&primary_release_date.gte=2000-01-01&primary_release_date.lte=2025-12-31&with_original_language=en&vote_count.gte=150.0&page=${pageNum}`
    );

    return response.data; // Returns a Promise that resolves to movies within genres
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};
