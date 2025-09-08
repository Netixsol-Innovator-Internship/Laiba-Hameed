"use client"

import { Card } from "@/components/ui/card"

export default function AuctionDetails({ timeLeft, currentBid }) {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Audi Q3</h1>

      {/* Timer + Current Bid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <TimeBox label="Hours left" value={timeLeft.hours} />
        <TimeBox label="Minutes" value={timeLeft.minutes} />
        <TimeBox label="Seconds" value={timeLeft.seconds} />
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            ${currentBid.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Current Bid</div>
        </div>
      </div>

      {/* Auction Info */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <Info label="Current Bid" value={`$${currentBid.toLocaleString()}`} />
        <Info label="End Time" value="06:00pm 03 Jan 2023" />
        <Info label="Min. Increment" value="$500" />
        <Info label="Total Bids" value="130" />
        <Info label="Lot Number" value="379631" />
        <Info label="Odometer" value="10,878 KM" />
      </div>
    </Card>
  )
}

function TimeBox({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-900">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div>
      <span className="text-gray-500">{label}:</span>
      <span className="ml-2 font-semibold">{value}</span>
    </div>
  )
}
