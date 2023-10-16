import { Bid } from "@/types";

// create types for component, this is only used here
export type ItemCardLastBidProps = {
    lastBid: Bid;
}

export function ItemCardLastBid({lastBid}:ItemCardLastBidProps) {
    return (
        <div className="border-yellow-500 py-4 px-1 font-bold border-t-[2px] border-b-[2px] flex flex-row justify-between items-center">
            <p className="text-lg"><span className="text-slate-700">Current bid:</span> {lastBid.price}</p>
            <p className="text-sm"><span className="text-slate-700">by</span> {lastBid.bidder?.username}</p>
        </div>
    );
}