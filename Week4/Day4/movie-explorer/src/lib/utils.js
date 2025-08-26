import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from "./constants"

export const getImageUrl = (path, type = "poster", size = "medium") => {
  if (!path) return "/abstract-movie-poster.png"

  const imageSize = IMAGE_SIZES[type][size]
  return `${TMDB_IMAGE_BASE_URL}/${imageSize}${path}`
}

export const formatDate = (dateString) => {
  if (!dateString) return "Unknown"

  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatRuntime = (minutes) => {
  if (!minutes) return "Unknown"

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) return `${remainingMinutes}m`
  return `${hours}h ${remainingMinutes}m`
}

export const formatRating = (rating) => {
  if (!rating) return "N/A"
  return rating.toFixed(1)
}

// Utility to get media type display name
export const getMediaTypeDisplay = (mediaType) => {
  switch (mediaType) {
    case "movie":
      return "Movie"
    case "tv":
      return "TV Show"
    default:
      return "Unknown"
  }
}
