"use client"

import { useGetPopularMoviesQuery } from "@/features/movies/tmdbApi"
import MovieCard from "../MovieCard"
import LoadingSpinner from "../LoadingSpinner"
import ErrorMessage from "../ErrorMessage"

export default function PopularMoviesSection() {
  const { data, error, isLoading, refetch } = useGetPopularMoviesQuery(1)

  if (isLoading) return <LoadingSpinner size="lg" />
  if (error) return <ErrorMessage message="Failed to load popular movies" onRetry={refetch} />

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Popular Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data?.results?.slice(0, 12).map((item) => (
            <MovieCard key={item.id} item={{ ...item, media_type: "movie" }} />
          ))}
        </div>
      </div>
    </section>
  )
}
