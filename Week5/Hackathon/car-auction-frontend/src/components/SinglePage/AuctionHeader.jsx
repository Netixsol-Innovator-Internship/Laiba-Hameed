import { Card } from "@/components/ui/card"
import useTimeLeft from "@/hooks/useTimeLeft"

export default function AuctionHeader({ auction }) {
  const timeLeft = useTimeLeft(auction.endTime)

  return (
    <Card className="p-6 flex flex-row items-center justify-between gap-4 flex-wrap text-sm">
      <Info 
        label="Time Left" 
        value={`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`} 
      />
      <Info 
        label="Current Bid" 
        value={`$${auction.currentBid?.toLocaleString()}`} 
      />
      <Info 
        label="End Time" 
        value={new Date(auction.endTime).toLocaleString()} 
      />
      <Info 
        label="Min Increment" 
        value={`$${auction.minIncrement?.toLocaleString() || 100}`} 
      />
      <Info 
        label="Total Bids" 
        value={auction.totalBids ?? 0} 
      />
      <Info 
        label="Lot No" 
        value={auction.car.vin ?? "N/A"} 
      />
      <Info 
        label="Odometer" 
        value={`${auction.car?.odometer?.toLocaleString() || 0} KM`} 
      />
    </Card>
  )
}

function Info({ label, value }) {
  return (
    <div className="flex flex-col" >
      <span className="font-bold text-sm text-[#2E3D83]">{value}</span>
      <span className="text-gray-500 text-sm">{label}</span>
    </div>
  )
}
