"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

export default function BidControls({
  isPlacingBid,
  bidAmount,
  setBidAmount,
  startingBid,
  totalBids,
  currentBid,
  minIncrement = 500,
  onSubmit,
  isOwner,
}) {
  const handleCustomInput = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    if (value >= currentBid + minIncrement) {
      setBidAmount(value);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col text-sm">
          <span className="font-bold text-sm text-[#2E3D83]">
            ${startingBid.toLocaleString()}
          </span>
          <span className="text-xs text-[#939393]">Bid Starts From</span>
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-bold text-sm text-[#2E3D83]">
            ${currentBid.toLocaleString()}
          </span>
          <span className="text-xs text-[#939393]">Current Bid</span>
        </div>
      </div>

      <Slider
        value={[bidAmount]}
        min={currentBid + minIncrement}
        max={currentBid + 50000}
        step={minIncrement}
        onValueChange={(val) => setBidAmount(val[0])}
      />

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-sm text-[#2E3D83]">{totalBids}</span>
          <span className="text-xs text-[#939393]">Bids Placed</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            className="text-[#2E3D83]"
            size="sm"
            variant="outline"
            onClick={() =>
              setBidAmount(Math.max(bidAmount - minIncrement, currentBid + minIncrement))
            }
          >
            <Minus />
          </Button>

          {/* Custom Input */}
          <Input
            type="number"
            min={currentBid + minIncrement}
            value={bidAmount}
            onChange={handleCustomInput}
            className="w-24 text-center font-semibold"
          />

          <Button
            className="text-[#2E3D83]"
            size="sm"
            variant="outline"
            onClick={() => setBidAmount(bidAmount + minIncrement)}
          >
            <Plus />
          </Button>
        </div>
      </div>

      {isOwner ? (
        <p className="text-red-500 text-sm">You cannot bid on your own car</p>
      ) : (
        <Button
          className="w-full bg-[#2E3D83] py-4 font-bold"
          onClick={onSubmit}
          disabled={isPlacingBid || bidAmount < currentBid + minIncrement}
        >
          {isPlacingBid ? "Submitting..." : "Submit A Bid"}
        </Button>
      )}
    </Card>
  );
}
