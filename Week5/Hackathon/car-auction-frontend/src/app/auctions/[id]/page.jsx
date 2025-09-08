"use client";

import { useSelector } from "react-redux";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import AuctionHeader from "@/components/SinglePage/AuctionHeader";
import BidControls from "@/components/SinglePage/BidControls";
import BiddersList from "@/components/SinglePage/BiddersList";
import Description from "@/components/SinglePage/Description";
import ImageGallery from "@/components/SinglePage/ImageGallery";
import TopBidder from "@/components/SinglePage/TopBidder";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
    useGetAuctionByIdQuery,
    usePlaceBidMutation,
} from "@/redux/slices/auctions/auctionApi";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";

export default function CarAuctionPage() {
    const params = useParams();
    const auctionId = params.id;

    const { data: auction, isLoading, error } = useGetAuctionByIdQuery(auctionId);
    const [placeBid, { isLoading: isPlacingBid }] = usePlaceBidMutation();

    const userId = useSelector((state) => state.auth?.user?._id);

    const [bidAmount, setBidAmount] = useState(0);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong</div>;
    if (!auction) return <div>No auction found</div>;

    const isOwner = auction.car.owner === userId;
    const images = auction.car.photos;

    const bidders = auction.bidders.map((b) => ({
        id: b._id,
        name: b.user.fullName,
        amount: b.amount,
    }));

    const topBidder =
        bidders.length > 0
            ? {
                name: auction.bidders[auction.bidders.length - 1].user.fullName,
                email: auction.bidders[auction.bidders.length - 1].user.email,
                mobile: auction.bidders[auction.bidders.length - 1].user.mobileNo,
                nationality: auction.bidders[auction.bidders.length - 1].user.nationality,
                idType: auction.bidders[auction.bidders.length - 1].user.idType,
                avatar: "/assets/user.png",
            }
            : null;

    const handleBidSubmit = async () => {
        try {
            await placeBid({
                id: auctionId,
                userId,
                amount: bidAmount,
            }).unwrap();

            // Optimistic update
            setBidAmount(bidAmount + (auction.minIncrement || 500));
        } catch (err) {
            console.error("Bid failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <PageBreadcrumb
                title={`${auction.car.year} ${auction.car.make} ${auction.car.model}`}
                description="Manage your account, track your bids, and view your vehicles"
                breadcrumbItems={[
                    { label: "Home", href: "/" },
                    { label: "Auctions", href: "/auctions" },
                    {
                        label: `${auction.car.year} ${auction.car.make} ${auction.car.model}`,
                        href: null,
                    },
                ]}
            />

            <div className="py-12">
                {/* Full-width Image Gallery */}
                <ImageGallery images={images} status={auction.status} />

                {/* Page Content */}
                <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
                    <div className="lg:col-span-2 space-y-6">
                        <AuctionHeader auction={auction} />
                        <Description description={auction.car.description} />
                        {topBidder && <TopBidder status={auction.status} topBidder={topBidder} />}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-4 h-[calc(100vh-2rem)] flex flex-col space-y-4">
                            <BidControls
                                bidAmount={
                                    bidAmount || auction.currentBid + (auction.minIncrement || 500)
                                }
                                setBidAmount={setBidAmount}
                                currentBid={auction.currentBid}
                                startingBid={auction.startingBid}
                                totalBids={auction.totalBids}
                                minIncrement={auction.minIncrement || 500}
                                isOwner={isOwner}
                                onSubmit={handleBidSubmit}
                                isPlacingBid={isPlacingBid}
                            />
                            <BiddersList bidders={bidders} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
