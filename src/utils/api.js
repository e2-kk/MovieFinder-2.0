import axios from "axios";

var api_key = process.env.REACT_APP_API_KEY;

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
    console.error("Error fetching movie details:", error);
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
    console.error("Error fetching trailers:", error);
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
    console.error("Error fetching watch providers:", error);
    return []; // Return an empty array in case of error
  }
};

export const getMovieByTitle = async (movieTerm) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movieTerm}&include_adult=false&with_original_language=en`
    );
    return response.data; // Returns a Promise that resolves to movie trailers
  } catch (error) {
    console.error("Error fetching movie by title:", error);
    return []; // Return an empty array in case of error
  }
};

export const getUserToken = async (userToken) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${api_key}`,
      {
        userToken,
      }
    );
    return response.data; // Returns a Promise that resolves to user access token
  } catch (error) {
    console.error("Error creating user token:", error);
    return {}; // Return an empty object in case of error
  }
};

export const createUserSession = async (userToken) => {
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${api_key}`,
      { request_token: userToken }
    );
    return response.data; // Returns a Promise that resolves to user session id
  } catch (error) {
    console.error("Error creating user session id:", error);
    return ""; // Return an empty string in case of error
  }
};

export const deleteUserSession = async (sessionId) => {
  try {
    const response = await axios.delete(
      `https://api.themoviedb.org/3/authentication/session?api_key=${api_key}`,
      { data: { session_id: sessionId } }
    );
    return response.data; // Returns a Promise that resolves to sucess: true for deleted session
  } catch (error) {
    console.error("Error deleting session id:", error);
    return false; // Return false in case of error
  }
};

export const getUserId = async (sessionId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account?api_key=${api_key}&session_id=${sessionId}`
    );
    return response.data; // Returns a Promise that resolves to user account data
  } catch (error) {
    console.error("Error getting user id:", error);
    return {}; // Return empty object in case of error
  }
};

export const getWatchList = async (accountId, sessionId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${api_key}&session_id=${sessionId}`
    );
    return response.data; // Returns a Promise that resolves to watchlist
  } catch (error) {
    console.error("Error getting watchlist:", error);
    return {}; // Return empty object in case of error
  }
};
