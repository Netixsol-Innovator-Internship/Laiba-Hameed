'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Heart } from 'lucide-react'
import Image from 'next/image'
import useTimeLeft from '@/hooks/useTimeLeft'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import {
    useGetUserQuery,
    useAddWishlistMutation,
    useRemoveWishlistMutation,
} from '@/redux/slices/users/usersApi'

export default function AuctionCard({ auction }) {
    const router = useRouter()
    const { user } = useSelector((state) => state.auth) || {}

    const { data: freshUser, refetch } = useGetUserQuery(user?._id, {
        skip: !user?._id,
    })

    const timeLeft = useTimeLeft(auction.endTime)
    const auctionEnded =
        timeLeft.months === 0 &&
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0

    const [addWishlist] = useAddWishlistMutation()
    const [removeWishlist] = useRemoveWishlistMutation()

    const inWishlist = freshUser?.wishlists?.some((a) => a._id === auction._id)

    const handleBidClick = () => {
        router.push(`/auctions/${auction._id}`)
    }

    const handleWishlist = async () => {
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
        <Card  onClick={() => router.push(`/auctions/${auction._id}`)} className="overflow-hidden cursor-pointer hover:shadow-lg py-0 rounded-sm transition-shadow bg-white">
            <div className="flex items-center">
                {/* Car Image */}
                <div className="relative w-52 h-40 flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br flex items-center justify-center">
                        <Image
                            src={auction.car.photos?.[0] || '/assets/placeholder-car.png'}
                            alt="car photo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    {auction.featured && (
                        <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">
                            Featured
                        </Badge>
                    )}
                </div>

                {/* Car Details */}
                <CardContent className="flex-1 p-6 gap-6 flex items-center w-full">
                    <div className="w-2/5">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-semibold text-[#2E3D83]">
                                {auction.car.year} {auction.car.make} {auction.car.model}
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8 hover:bg-gray-100 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation() // prevent card click
                                    handleWishlist()
                                }}
                            >
                                <Heart
                                    className={`w-5 h-5 ${inWishlist
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-400'
                                        }`}
                                />
                            </Button>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 fill-yellow-400 text-yellow-400`}
                                />
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-[#939393] text-sm mb-6 line-clamp-3 leading-relaxed">
                            {auction.car.description}{' '}
                            <span className="text-indigo-600 cursor-pointer hover:underline">
                                View Details
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col justify-between w-3/5">
                        <div className="flex items-start justify-between pb-6">
                            {/* Left side - Price and Time */}
                            <div>
                                <div className="mb-4">
                                    <span className="text-sm font-bold text-[#2E3D83]">
                                        ${auction.currentBid}
                                    </span>
                                    <p className="text-xs text-[#939393]">Current Bid</p>
                                </div>

                                {/* Timer */}
                                <div className="flex items-center space-x-3 text-sm">
                                    {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                                        <div className="text-center" key={unit}>
                                            <div className="bg-transparent border text-[#2E3D83] px-2 py-1 rounded text-xs font-mono min-w-[28px]">
                                                {timeLeft[unit]}
                                            </div>
                                            <span className="text-xs text-gray-500 mt-1 block">
                                                {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-gray-500">Time Left</p>
                            </div>

                            {/* Right side - Bids and End Time */}
                            <div className="text-right">
                                <div className="mb-4">
                                    <span className="text-sm font-bold text-[#2E3D83]">
                                        {auction.totalBids}
                                    </span>
                                    <p className="text-xs text-[#939393]">Total Bids</p>
                                </div>

                                <div className="mb-6">
                                    <p className="text-sm font-bold text-[#2E3D83]">
                                        {new Date(auction.endTime).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-[#939393]">End Time</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleBidClick}
                            disabled={auctionEnded || user?._id === auction.seller?._id}
                            className="cursor-pointer bg-transparent border border-[#2E3D83] rounded-sm text-[#2E3D83] hover:bg-[#2E3D83] hover:text-white px-8 py-4 font-bold disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-500"
                        >
                            {renderButtonLabel()}
                        </Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
