import Image from "next/image"
import { Card } from "@/components/ui/card"

export default function TopBidder({ status,topBidder }) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">{status === "Sold Out" ? "Winner" : "Top Bidder"}</h2>
      <div className="flex items-center space-x-4">
        <Image
          src={topBidder.avatar}
          alt={topBidder.name}
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
        <div className="flex gap-12 flex-wrap text-sm">
          <Info label="Full Name" value={topBidder.name} />
          <Info label="Email" value={topBidder.email} />
          <Info label="Mobile" value={topBidder.mobile} />
          <Info label="Nationality" value={topBidder.nationality} />
          <Info label="ID Type" value={topBidder.idType} />
        </div>
      </div>
    </Card>
  )
}

function Info({ label, value }) {
  return (
    <div className="flex gap-6">
      <span className="font-bold text-[#2E3D83]">{label}:</span>
      <span className="text-gray-500 ">{value}</span>
    </div>
  )
}
