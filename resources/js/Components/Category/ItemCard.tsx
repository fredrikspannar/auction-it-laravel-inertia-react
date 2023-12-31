import { Item } from "@/types";
import { ItemCardLastBid } from '@/Components/Category/ItemCardLastBid';
import { Link } from '@inertiajs/react'
import {Currency} from '@/Components/Shared/Currency';

// create types for component, this is only used here
export type ItemCardProps = {
    item: Item;
    smallerItemCard?:boolean;
    hideSeller?:boolean;
}

export function ItemCard( {item, smallerItemCard=false, hideSeller=false}:ItemCardProps ) {

    // handler for broken images, fallback to empty
    const brokenImageFallback = (e:React.SyntheticEvent<EventTarget>) => {
        // event e needs to be casted as HTMLInputElement or else TS will show this as an error
        let target = e.target as HTMLInputElement;
        target.src = "/images/empty_item.png";
    }

    return (
        <Link href={route('item', item.id)} title={`Show item "${item.title}"`}>
            <div className={`itemCard mt-4 ${smallerItemCard && "!w-60 !h-26 mr-4"}`}>
                <p><img onError={brokenImageFallback} src={`/storage/${(item.images && item.images[0]) ? item.images[0].image : "placeholder.jpg"}`} alt={item.title} /></p>
                <div className="itemCardContent">
                    <p className="text-lg">{item.title}</p>
                    <div className="py-4 px-1 flex flex-row justify-between">
                        <p><span className="text-slate-800">Price:</span> <Currency price={item.price} /></p>
                        {!hideSeller && <p><span className="text-slate-800">Seller:</span> {item.seller?.username}</p>}
                    </div>
                    <p className="mb-8 px-1"><span className="text-slate-800">Ends:</span> {item.ends_at.toString()}</p>

                    {item.lastBid && <ItemCardLastBid lastBid={item.lastBid} smallerItemCard={smallerItemCard}/> }
                </div>
            </div>
        </Link>
    );
}