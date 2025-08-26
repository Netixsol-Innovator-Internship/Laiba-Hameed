"use client"

import { useGetTrendingQuery } from "@/features/movies/tmdbApi"
import MovieCard from "../MovieCard"
import LoadingSpinner from "../LoadingSpinner"
import ErrorMessage from "../ErrorMessage"

export default function TrendingSection() {
  const { data, error, isLoading, refetch } = useGetTrendingQuery(1)

  if (isLoading) return <LoadingSpinner size="lg" />
  if (error) return <ErrorMessage message="Failed to load trending content" onRetry={refetch} />

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Trending Now</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data?.results?.slice(0, 12).map((item) => (
            <MovieCard key={`${item.id}-${item.media_type}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
