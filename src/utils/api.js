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

export const getSortedMoviesByYear = async (pageNum, sortingOption) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&primary_release_date.gte=2000-01-01&primary_release_date.lte=2025-12-31&with_original_language=en&vote_count.gte=150.0&page=${pageNum}&sort_by=${sortingOption.year}`
    );
    return response.data; // Returns a Promise that resolves to sorted movies by release year
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};

export const getSortedMoviesByRating = async (pageNum, sortingOption) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&primary_release_date.gte=2000-01-01&primary_release_date.lte=2025-12-31&with_original_language=en&vote_count.gte=150.0&page=${pageNum}&sort_by=${sortingOption.rate}`
    );
    return response.data; // Returns a Promise that resolves to sorted movies by rating
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};

export const getSortedMoviesByServices = async (pageNum, sortingOption) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&primary_release_date.gte=2000-01-01&primary_release_date.lte=2025-12-31&with_original_language=en&vote_count.gte=150.0&page=${pageNum}&with_watch_providers=${sortingOption.services}`
    );
    return response.data; // Returns a Promise that resolves to sorted movies by services
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};

export const getSortedMoviesByServicesWithinCategory = async (
  pageNum,
  sortingOption,
  category
) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&primary_release_date.gte=2000-01-01&primary_release_date.lte=2025-12-31&with_original_language=en&vote_count.gte=150.0&page=${pageNum}&with_watch_providers=${sortingOption.services}&with_genres=${category}`
    );
    return response.data; // Returns a Promise that resolves to sorted movies by services within selected category4
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};

export const getSortedMoviesByRatingWithinCategory = async (
  pageNum,
  sortingOption,
  category
) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&primary_release_date.gte=2000-01-01&primary_release_date.lte=2025-12-31&with_original_language=en&vote_count.gte=150.0&page=${pageNum}&sort_by=${sortingOption.rate}&with_genres=${category}`
    );
    return response.data; // Returns a Promise that resolves to sorted movies by rating within selected category
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};

export const getSortedMoviesByYearWithinCategory = async (
  pageNum,
  sortingOption,
  category
) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&primary_release_date.gte=2000-01-01&primary_release_date.lte=2025-12-31&with_original_language=en&vote_count.gte=150.0&page=${pageNum}&sort_by=${sortingOption.year}&with_genres=${category}`
    );
    return response.data; // Returns a Promise that resolves to sorted movies by release year within selected category
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}&?api_key=${api_key}`
    );
    return response.data; // Returns a Promise that resolves to movie details
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};

export const getMovieTrailers = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`
    );
    return response.data.results; // Returns a Promise that resolves to movie trailers
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};

export const getMovieWatchProviders = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${api_key}`
    );
    return response.data.results; // Returns a Promise that resolves to movie trailers
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};
