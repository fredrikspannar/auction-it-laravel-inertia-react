import { Bid } from "@/types";
import {Currency} from '@/Components/Shared/Currency';

// create types for component, this is only used here
export type ItemCardLastBidProps = {
    lastBid: Bid;
    smallerItemCard?: boolean;
}

export function ItemCardLastBid({lastBid, smallerItemCard=false}:ItemCardLastBidProps) {
    return (
        <div className={`border-yellow-500 py-4 px-1 font-bold border-t-[2px] border-b-[2px] flex ${!smallerItemCard ? "flex-row" : "flex-col"} justify-between items-center`}>
            <p className={`${!smallerItemCard && "text-lg"}`}><span className="text-slate-700">Current bid:</span> <Currency price={lastBid.price} /></p>
            <p className={`${!smallerItemCard && "text-sm"}`}><span className="text-slate-700">by</span> {lastBid.bidder?.username}</p>
        </div>
    );
}