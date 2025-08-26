"use client"

import { useGetTrendingQuery } from "@/features/movies/tmdbApi"
import { getImageUrl, formatRating } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Play, Info, Star } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const { data } = useGetTrendingQuery(1)

  // Get the first trending item for hero
  const heroItem = data?.results?.[0]

  if (!heroItem) return null

  const title = heroItem.title || heroItem.name
  const mediaType = heroItem.media_type || "movie"
  const detailsPath = mediaType === "tv" ? `/tv/${heroItem.id}` : `/movie/${heroItem.id}`

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[400px] md:min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getImageUrl(heroItem.backdrop_path, "backdrop", "large")})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30 md:from-background/90 md:via-background/50 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl md:max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 text-foreground leading-tight">
              {title}
            </h1>

            {heroItem.overview && (
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 md:mb-6 line-clamp-2 md:line-clamp-3 leading-relaxed">
                {heroItem.overview}
              </p>
            )}

            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 text-sm md:text-base">
              {heroItem.vote_average > 0 && (
                <div className="flex items-center gap-2 text-foreground">
                  <Star className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{formatRating(heroItem.vote_average)}</span>
                </div>
              )}

              <div className="text-muted-foreground">
                {heroItem.release_date || heroItem.first_air_date
                  ? new Date(heroItem.release_date || heroItem.first_air_date).getFullYear()
                  : "TBA"}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href={detailsPath}>
                <Button size="sm" className="w-full sm:w-auto flex items-center justify-center gap-2 md:size-lg">
                  <Play className="h-4 w-4 md:h-5 md:w-5" />
                  Watch Now
                </Button>
              </Link>

              <Link href={detailsPath}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent md:size-lg"
                >
                  <Info className="h-4 w-4 md:h-5 md:w-5" />
                  More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
