'use client'
import FilterSidebar from '@/components/Auction/FilterSidebar'
import AuctionCard from '@/components/common/AuctionCard'
import PageBreadcrumb from '@/components/common/PageBreadcrumb'
import Footer from '@/components/Layouts/Footer'
import Header from '@/components/Layouts/Header'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetAuctionsQuery } from '@/redux/slices/auctions/auctionApi'

export default function AuctionPage() {
    const { data: auctions = [], isLoading, isError } = useGetAuctionsQuery()

    if (isLoading) return <p className="text-center text-white">Loading auctions...</p>
    if (isError) return <p className="text-center text-red-500">Failed to load auctions.</p>

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <PageBreadcrumb
                title="Auction"
                description="Browse our live auctions and find your perfect vehicle"
                breadcrumbItems={[
                    { label: "Home", href: "/" },
                    { label: "Auction", href: null }
                ]}
            />

            <div className='flex items-center justify-center w-full' >
                <main className="px-4 py-8 max-w-[1440px]">
                    <div className="flex gap-8">
                        {/* Left Section - Results and Cards */}
                        <div className="flex-1">
                            {/* Top Navigation Bar */}
                            <div className="bg-[#2E3D83] text-white px-6 py-4 rounded-sm mb-6 flex justify-between items-center">
                                <span className="font-medium">Showing 1-5 of 10 Results</span>

                                <div className="flex items-center space-x-2">
                                    <span className="text-sm">Sort By</span>

                                    <Select>
                                        <SelectTrigger className="bg-white text-black min-w-[200px]">
                                            <SelectValue placeholder="Newness" className='text-white' />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white text-black">
                                            <SelectItem value="newest">Newness</SelectItem>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                            <SelectItem value="ending-soon">Ending Soon</SelectItem>
                                            <SelectItem value="most-bids">Most Bids</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Auction Cards */}
                            <div className="space-y-4">
                                {[...auctions]
                                    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
                                    .map((auction) => (
                                        <AuctionCard key={auction._id} auction={auction} />
                                    ))}
                            </div>

                        </div>

                        {/* Right Section - Filters */}
                        <div className="w-80 flex-shrink-0">
                            <FilterSidebar />
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    )
}