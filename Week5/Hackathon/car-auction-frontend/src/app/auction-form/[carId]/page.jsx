"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useCreateAuctionMutation } from "@/redux/slices/auctions/auctionApi";

// Zod schema for auction validation (no startTime)
const AuctionSchema = z.object({
    endTime: z.string().min(1, "End time is required"),
    startingBid: z.coerce.number().min(1, "Starting bid must be at least $1"),
});

export default function AuctionForm() {
    const router = useRouter();
    const params = useParams();
    const carId = params.carId;

    const user = useSelector((state) => state.auth.user);

    const [createAuction, { isLoading }] = useCreateAuctionMutation();

    const form = useForm({
        resolver: zodResolver(AuctionSchema),
        defaultValues: {
            endTime: "",
            startingBid: "",
        },
    });

    // Redirect if no carId
    useEffect(() => {
        if (!carId) {
            alert("No car selected for auction. Please submit a car first.");
            router.push("/");
        }
    }, [carId, router]);

    const onSubmit = async (values) => {
        console.log("CarId from URL:", carId);

        if (!user?.id && !user?._id) {
            alert("Please log in to create an auction.");
            return;
        }

        if (!carId) {
            alert("Car ID is missing. Please go back and submit your car first.");
            return;
        }

        try {
            const auctionData = {
                car: carId,
                seller: user.id || user._id,
                endTime: new Date(values.endTime).toISOString(),
                startingBid: Number(values.startingBid),
            };

            console.log("AuctionData sending:", auctionData);
            await createAuction(auctionData).unwrap();

            alert("Auction created successfully! Your car is now live for bidding.");
            router.push("/auctions");
        } catch (err) {
            console.error("Create Auction Error:", err);
            alert("Something went wrong creating the auction. Please try again.");
        }
    };

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <div className="bg-[#DBE8FF] rounded-sm p-6">
                <h2 className="font-bold text-2xl mb-1">Set Up Your Auction</h2>
                <div className="h-1 w-32 bg-yellow-400 rounded mb-4"></div>

                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                        Great! Your car has been submitted successfully. Now let's set up
                        the auction details so buyers can start bidding on your vehicle.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Auction Timing */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-gray-800">
                                Auction Timing
                            </h3>

                            {/* End Time */}
                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-800">
                                            End Time*
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                className="w-full bg-white border border-gray-300 rounded h-10"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Bidding Details */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-gray-800">
                                Bidding Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Starting Bid */}
                                <FormField
                                    control={form.control}
                                    name="startingBid"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium text-gray-800">
                                                Starting Bid ($)*
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    step="1"
                                                    placeholder="5000"
                                                    className="bg-white border border-gray-300 rounded h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                            <h4 className="font-semibold text-yellow-800 mb-2">
                                Auction Guidelines:
                            </h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Once started, auctions cannot be cancelled</li>
                                <li>• Set a reasonable starting bid to attract bidders</li>
                                <li>• Longer auctions typically get more bids</li>
                                <li>• You'll be notified of all bids via email</li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.back()}
                                    className="px-8 h-11"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 font-bold bg-blue-800 hover:bg-blue-900 text-white h-11 rounded"
                                >
                                    {isLoading ? "Creating Auction..." : "Start Auction"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
