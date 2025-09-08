"use client"
import { useGetAuctionsQuery } from '@/redux/slices/auctions/auctionApi'
import LiveAuctionCard from '../common/LiveAuctionCard'

export default function LiveAuctions() {
    const { data: auctions = [], isLoading, isError } = useGetAuctionsQuery()

    if (isLoading) return <p className="text-center text-white">Loading auctions...</p>
    if (isError) return <p className="text-center text-red-500">Failed to load auctions.</p>

    return (
        <section className="bg-[#2E3D83] py-16 my-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-2">Live Auction</h2>
                    <div className="w-16 h-1 bg-[#F4C23D] mx-auto"></div>
                </div>

                {/* Auction Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {auctions
                        .slice() 
                        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
                        .slice(0, 4) 
                        .map((auction) => (
                            <LiveAuctionCard key={auction._id} auction={auction} />
                        ))}

                </div>
            </div>
        </section>
    )
}
