export const TMDB_BASE_URL = "https://api.themoviedb.org/3"
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"
export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

// Image sizes
export const IMAGE_SIZES = {
  poster: {
    small: "w342",
    medium: "w500",
    large: "w780",
  },
  backdrop: {
    small: "w780",
    medium: "w1280",
    large: "original",
  },
}

// API endpoints
export const ENDPOINTS = {
  trending: "/trending/all/day",
  popularMovies: "/movie/popular",
  searchMulti: "/search/multi",
  movieDetails: "/movie",
  tvDetails: "/tv",
}
