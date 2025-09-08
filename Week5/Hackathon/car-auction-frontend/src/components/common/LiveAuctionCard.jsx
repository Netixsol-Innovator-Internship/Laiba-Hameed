'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Star, Heart, Loader2 } from 'lucide-react'
import useTimeLeft from '@/hooks/useTimeLeft'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import {
    useGetUserQuery,
    useAddWishlistMutation,
    useRemoveWishlistMutation,
} from '@/redux/slices/users/usersApi'

export default function LiveAuctionCard({ auction }) {
    const router = useRouter()
    const { user } = useSelector((state) => state.auth) || {}

    const timeLeft = useTimeLeft(auction.endTime)
    const auctionEnded =
        timeLeft.months === 0 &&
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0

    // fresh user from API
    const { data: freshUser, refetch } = useGetUserQuery(user?._id, {
        skip: !user?._id,
    })

    const [addWishlist] = useAddWishlistMutation()
    const [removeWishlist] = useRemoveWishlistMutation()

    const inWishlist = freshUser?.wishlists?.some((a) => a._id === auction._id)

    const handleBidClick = () => {
        router.push(`/auctions/${auction._id}`)
    }

    const handleWishlist = async (e) => {
        e.stopPropagation() // don’t trigger card navigation
        if (!user?._id) return
        try {
            if (inWishlist) {
                await removeWishlist({ id: user._id, auctionId: auction._id }).unwrap()
            } else {
                await addWishlist({ id: user._id, auctionId: auction._id }).unwrap()
            }
            refetch()
        } catch (err) {
            console.error('Wishlist toggle failed:', err)
        }
    }

    const renderButtonLabel = () => {
        if (user?._id === auction.seller?._id) {
            return 'Your Auction'
        }
        if (auctionEnded) {
            return auction.totalBids > 0 ? 'Sold Out' : 'Auction Ended'
        }
        return 'Submit A Bid'
    }

    return (
        <Card
            onClick={() => router.push(`/auctions/${auction._id}`)}
            key={auction._id}
            className="overflow-hidden cursor-pointer gap-2 py-0 rounded-none bg-white shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {/* Header with Trending Badge and Wishlist */}
            <div className="relative border-b">
                <div className="flex items-start justify-between">
                    {auction.totalBids > 2 ? (
                        <Badge className="bg-red-500 hover:bg-red-600 rounded-none text-white px-1 py-1 flex items-center gap-1">
                            <span className="text-xs font-medium">Trending</span>
                            <TrendingUp className="w-3 h-3" />
                        </Badge>
                    ) : (
                        <div></div>
                    )}

                    <button
                        onClick={handleWishlist}
                        className="text-[#2E3D83] bg-white shadow-2xl p-2 rounded-b-xl rounded-l-xl border cursor-pointer hover:text-yellow-400 transition-colors"
                    >
                        <Heart
                            className={`w-5 h-5 ${inWishlist ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                                }`}
                        />
                    </button>
                </div>

                <h3 className="text-center font-semibold text-black mb-4">
                    {auction.car.year} {auction.car.make} {auction.car.model}
                </h3>
            </div>

            {/* Car Image */}
            <div className="relative px-4">
                <div className="h-32 bg-gradient-to-b rounded-lg flex items-center justify-center">
                    <img
                        src={auction.car.photos?.[0] || '/assets/placeholder-car.png'}
                        alt={`${auction.car.make} ${auction.car.model}`}
                        className="h-full w-full object-contain"
                    />
                </div>
            </div>

            {/* Content */}
            <CardContent className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-center mb-4">
                        <p className="text-sm font-bold">${auction.currentBid}</p>
                        <span className="text-sm font-medium">Current Bid</span>
                    </div>

                    <div className="text-center mb-4">
                        {auctionEnded ? (
                            <p className="text-sm text-gray-500">Ended</p>
                        ) : timeLeft ? (
                            <p className="text-sm font-mono">
                                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{' '}
                                {timeLeft.seconds}s
                            </p>
                        ) : (
                            <Loader2 className="animate-spin" />
                        )}
                        <span className="text-sm font-semibold">Time Left</span>
                    </div>
                </div>

                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleBidClick()
                    }}
                    disabled={auctionEnded || user?._id === auction.seller?._id}
                    className="w-full bg-[#2E3D83] hover:bg-[#F4C23D] cursor-pointer rounded-sm text-white font-semibold py-3 transition-colors duration-200 disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-500"
                >
                    {renderButtonLabel()}
                </Button>
            </CardContent>
        </Card>
    )
}
