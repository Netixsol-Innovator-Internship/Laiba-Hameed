import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function BiddersList({ bidders }) {
  return (
    <Card className="p-6 flex-1 flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Bidders List</h2>
      <ScrollArea className="h-full">
        <div className="flex gap-2 flex-col-reverse">
          {bidders.length > 0 ? (
            [...bidders]
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((b) => (
                <div
                  key={b.id}
                  className="flex justify-between text-sm p-2 rounded bg-gray-50"
                >
                  <span>{b.name}</span>
                  <span className="font-semibold">
                    ${b.amount.toLocaleString()}
                  </span>
                </div>
              ))
          ) : (
            <p>Waiting for the Bidding....</p>
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}