import { createSlice } from "@reduxjs/toolkit"

// Load watchlist from localStorage
const loadWatchlistFromStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const savedWatchlist = localStorage.getItem("movieWatchlist")
      return savedWatchlist ? JSON.parse(savedWatchlist) : []
    } catch (error) {
      console.error("Error loading watchlist from localStorage:", error)
      return []
    }
  }
  return []
}

// Save watchlist to localStorage
const saveWatchlistToStorage = (watchlist) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("movieWatchlist", JSON.stringify(watchlist))
    } catch (error) {
      console.error("Error saving watchlist to localStorage:", error)
    }
  }
}

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: loadWatchlistFromStorage(),
    sortBy: "dateAdded", // dateAdded, title, rating, releaseDate
    sortOrder: "desc", // asc, desc
    filterBy: "all", // all, movie, tv
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const item = action.payload
      const exists = state.items.find(
        (watchlistItem) => watchlistItem.id === item.id && watchlistItem.media_type === item.media_type,
      )

      if (!exists) {
        const itemWithTimestamp = {
          ...item,
          dateAdded: new Date().toISOString(),
        }
        state.items.push(itemWithTimestamp)
        saveWatchlistToStorage(state.items)
      }
    },
    removeFromWatchlist: (state, action) => {
      const { id, media_type } = action.payload
      state.items = state.items.filter((item) => !(item.id === id && item.media_type === media_type))
      saveWatchlistToStorage(state.items)
    },
    removeMultipleFromWatchlist: (state, action) => {
      const itemsToRemove = action.payload // Array of {id, media_type}
      state.items = state.items.filter(
        (item) => !itemsToRemove.some((toRemove) => toRemove.id === item.id && toRemove.media_type === item.media_type),
      )
      saveWatchlistToStorage(state.items)
    },
    clearWatchlist: (state) => {
      state.items = []
      saveWatchlistToStorage([])
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    setFilterBy: (state, action) => {
      state.filterBy = action.payload
    },
  },
})

export const {
  addToWatchlist,
  removeFromWatchlist,
  removeMultipleFromWatchlist,
  clearWatchlist,
  setSortBy,
  setSortOrder,
  setFilterBy,
} = watchlistSlice.actions

// Selectors
export const selectWatchlist = (state) => state.watchlist.items
export const selectIsInWatchlist = (state, id, media_type) =>
  state.watchlist.items.some((item) => item.id === id && item.media_type === media_type)

export const selectSortedAndFilteredWatchlist = (state) => {
  const { items, sortBy, sortOrder, filterBy } = state.watchlist

  // Filter items
  let filteredItems = items
  if (filterBy !== "all") {
    filteredItems = items.filter((item) => item.media_type === filterBy)
  }

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    let aValue, bValue

    switch (sortBy) {
      case "title":
        aValue = (a.title || a.name || "").toLowerCase()
        bValue = (b.title || b.name || "").toLowerCase()
        break
      case "rating":
        aValue = a.vote_average || 0
        bValue = b.vote_average || 0
        break
      case "releaseDate":
        aValue = new Date(a.release_date || a.first_air_date || 0)
        bValue = new Date(b.release_date || b.first_air_date || 0)
        break
      case "dateAdded":
      default:
        aValue = new Date(a.dateAdded || 0)
        bValue = new Date(b.dateAdded || 0)
        break
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  return sortedItems
}

export const selectWatchlistStats = (state) => {
  const items = state.watchlist.items
  return {
    total: items.length,
    movies: items.filter((item) => item.media_type === "movie").length,
    tvShows: items.filter((item) => item.media_type === "tv").length,
    averageRating: items.length > 0 ? items.reduce((sum, item) => sum + (item.vote_average || 0), 0) / items.length : 0,
  }
}

export const selectWatchlistSettings = (state) => ({
  sortBy: state.watchlist.sortBy,
  sortOrder: state.watchlist.sortOrder,
  filterBy: state.watchlist.filterBy,
})

export default watchlistSlice.reducer
