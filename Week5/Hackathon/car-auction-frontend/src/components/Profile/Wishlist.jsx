'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Heart, Loader2 } from 'lucide-react'
import useTimeLeft from '@/hooks/useTimeLeft'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  useAddWishlistMutation,
  useRemoveWishlistMutation,
} from '@/redux/slices/users/usersApi'

function AuctionCard({ auction, user, router, isInWishlist, toggleWishlist }) {
  const timeLeft = useTimeLeft(auction.endTime)
  const auctionEnded =
    timeLeft.months === 0 &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0

  const renderButtonLabel = () => {
    if (user?._id === auction.seller?._id) return 'Your Auction'
    if (auctionEnded) return auction.totalBids > 0 ? 'Sold Out' : 'Auction Ended'
    return 'Submit A Bid'
  }

  return (
    <Card
      key={auction._id}
      onClick={() => router.push(`/auctions/${auction._id}`)}
      className="max-w-md py-0 mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="relative border-b p-3">
        <div className="flex items-start justify-between">
          {auction.totalBids > 2 ? (
            <Badge className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 flex items-center gap-1">
              <span className="text-xs font-medium">Trending</span>
              <TrendingUp className="w-3 h-3" />
            </Badge>
          ) : (
            <div></div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleWishlist(auction._id)
            }}
            className="text-[#2E3D83] bg-white shadow p-2 rounded-full border hover:text-yellow-400 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${isInWishlist(auction._id)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-400'
                }`}
            />
          </button>
        </div>

        <h3 className="text-center font-semibold text-[#2E3D83] mt-2">
          {auction.car.year} {auction.car.make} {auction.car.model}
        </h3>
      </div>

      {/* Image */}
      <div className="relative px-4 pt-3">
        <div className="h-40 flex items-center justify-center bg-gray-50">
          <img
            src={auction.car.photos?.[0] || '/assets/placeholder-car.png'}
            alt={`${auction.car.make} ${auction.car.model}`}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        {/* Description */}
        <p className="text-[#939393] text-[10px] line-clamp-2 mb-3">
          {auction.car.description}
        </p>

        {/* Price & Bids */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm font-bold text-[#2E3D83]">
              ${auction.currentBid}
            </p>
            <span className="text-[10px] text-gray-500">Current Bid</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-[#2E3D83]">
              {auction.totalBids}
            </p>
            <span className="text-[10px] text-gray-500">Total Bids</span>
          </div>
        </div>

        {/* Time Left & End Time */}
        <div className="flex justify-between items-end mb-4">
          <div>
            {auctionEnded ? (
              <p className="text-xs text-gray-500">Ended</p>
            ) : timeLeft ? (
              <p className="text-[10px] font-mono">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{' '}
                {timeLeft.seconds}s
              </p>
            ) : (
              <Loader2 className="animate-spin" />
            )}
            <span className="text-[10px] text-gray-500">Time Left</span>
          </div>

          <div className="text-right">
            <p className="text-xs font-semibold text-[#2E3D83]">
              {new Date(auction.endTime).toLocaleString()}
            </p>
            <span className="text-[10px] text-gray-500">End Time</span>
          </div>
        </div>

        {/* Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/auctions/${auction._id}`)
          }}
          disabled={auctionEnded || user?._id === auction.seller?._id}
          className="w-full bg-transparent text-[#2E3D83] hover:bg-[#2E3D83] cursor-pointer rounded-sm hover:text-white font-semibold py-3 transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-500 border border-[#2E3D83]"
        >
          {renderButtonLabel()}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function Wishlist({ wishlists }) {
  const router = useRouter()
  const { user } = useSelector((state) => state.auth) || {}

  const [addWishlist] = useAddWishlistMutation()
  const [removeWishlist] = useRemoveWishlistMutation()
  const [wishlistState, setWishlistState] = useState([])

  // Initialize wishlist state
  useEffect(() => {
    if (wishlists?.length) {
      const initialState = wishlists.map((auction) => ({
        id: auction._id,
        inWishlist: true,
      }))
      setWishlistState(initialState)
    }
  }, [wishlists])

  const isInWishlist = (id) =>
    wishlistState.find((w) => w.id === id)?.inWishlist || false

  const toggleWishlist = async (auctionId) => {
    if (!user?._id) return
    const inWishlist = isInWishlist(auctionId)
    try {
      if (inWishlist) {
        await removeWishlist({ id: user._id, auctionId }).unwrap()
        setWishlistState((prev) =>
          prev.map((w) =>
            w.id === auctionId ? { ...w, inWishlist: false } : w
          )
        )
      } else {
        await addWishlist({ id: user._id, auctionId }).unwrap()
        setWishlistState((prev) =>
          prev.map((w) =>
            w.id === auctionId ? { ...w, inWishlist: true } : w
          )
        )
      }
    } catch (err) {
      console.error('Wishlist toggle failed:', err)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Wishlist ({wishlists.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wishlists.map((auction) => (
          <AuctionCard
            key={auction._id}
            auction={auction}
            user={user}
            router={router}
            isInWishlist={isInWishlist}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </div>
  )
}
