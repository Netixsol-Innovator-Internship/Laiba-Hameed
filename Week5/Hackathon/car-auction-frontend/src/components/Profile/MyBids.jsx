'use client'

import { Button } from '@/components/ui/button'
import { TrendingUp } from 'lucide-react'
import useTimeLeft from '@/hooks/useTimeLeft'
import { useSelector } from 'react-redux'
import { getUser } from '@/redux/slices/auth/authSlice'

export default function MyBids({ bids }) {
    const user = useSelector(getUser)

    if (!bids || bids.length === 0) {
        return <p className="text-gray-500">You have not placed any bids yet.</p>
    }

    const formatCurrency = (value) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(value)

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bids.map((auction) => {
                    const { months, days, hours, minutes, seconds } = useTimeLeft(
                        auction.endTime
                    )
                    const auctionEnded =
                        months === 0 &&
                        days === 0 &&
                        hours === 0 &&
                        minutes === 0 &&
                        seconds === 0

                    // find latest bid of logged-in user
                    const myBid = auction.bidders
                        ?.filter((b) => b.user === user?._id)
                        ?.sort(
                            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                        )[0]

                    return (
                        <div
                            key={auction._id}
                            className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            {/* Trending Badge */}
                            <div className="relative">
                                {auction.totalBids > 10 && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1">
                                            Trending
                                            <TrendingUp className="w-4 h-4" />
                                        </div>
                                    </div>
                                )}

                                {/* Car Title */}
                                <div className="text-center pt-8 pb-4">
                                    <h2 className="text-base font-bold text-[#2E3D83]">
                                        {auction.car?.make} {auction.car?.model}
                                    </h2>
                                    <p className="text-gray-500">{auction.car?.year}</p>
                                </div>

                                {/* Car Image */}
                                <div className="px-4 pb-6">
                                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                                        <img
                                            src={auction.car?.photos[0] || '/assets/placeholder-car.png'}
                                            alt={auction.car?.model || 'Car'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bid Information */}
                            <div className="px-6 pb-6">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {/* Winning Bid */}
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="text-sm font-bold text-[#2E3D83]">
                                            {auction.winner
                                                ? formatCurrency(auction.currentBid)
                                                : formatCurrency(auction.currentBid)}
                                        </div>
                                        <div className="text-[#939393] text-xs">Winning Bid</div>
                                    </div>

                                    {/* Your Bid */}
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <div className="text-sm font-bold text-[#16A34A]">
                                            {myBid
                                                ? formatCurrency(myBid.amount)
                                                : 'No Bid Yet'}
                                        </div>
                                        <div className="text-[#939393] text-xs">Your Bid</div>
                                    </div>
                                </div>

                                {/* Time and Bids Info */}
                                <div className="flex justify-between items-center mb-6">
                                    {/* Time Left */}
                                    <div className="flex gap-2 mb-2">
                                        {auctionEnded ? (
                                            <div className="text-lg font-medium text-gray-700">
                                                Auction Ended
                                            </div>
                                        ) : (
                                            <>
                                                {months > 0 && (
                                                    <div className="text-center">
                                                        <div className="bg-gray-100 rounded px-2 py-1 text-[9px] font-medium text-gray-700">
                                                            {months}
                                                        </div>
                                                        <div className="text-[9px] text-gray-500">Months</div>
                                                    </div>
                                                )}
                                                <div className="text-center">
                                                    <div className="bg-gray-100 rounded px-2 py-1 text-[9px] font-medium text-gray-700">
                                                        {days}
                                                    </div>
                                                    <div className="text-[9px] text-gray-500">Days</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="bg-gray-100 rounded px-2 py-1 text-[9px] font-medium text-gray-700">
                                                        {hours}
                                                    </div>
                                                    <div className="text-[9px] text-gray-500">Hours</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="bg-gray-100 rounded px-2 py-1 text-[9px] font-medium text-gray-700">
                                                        {minutes}
                                                    </div>
                                                    <div className="text-[9px] text-gray-500">Mins</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="bg-gray-100 rounded px-2 py-1 text-[9px] font-medium text-gray-700">
                                                        {seconds}
                                                    </div>
                                                    <div className="text-[9px] text-gray-500">Secs</div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Total Bids */}
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-[#2E3D83]">
                                            {auction.totalBids}
                                        </div>
                                        <div className="text-gray-500 text-[10px]">Total Bids</div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Button
                                    disabled={auctionEnded}
                                    className="w-full bg-[#2E3D83] hover:bg-indigo-700 text-white font-medium py-4 rounded-lg text-base"
                                >
                                    {auctionEnded ? 'Auction Ended' : 'Increase Bid'}
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
