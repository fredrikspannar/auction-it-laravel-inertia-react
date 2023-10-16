import { Item } from "@/types";
import { ItemCardLastBid } from '@/Components/Category/ItemCardLastBid';

// create types for component, this is only used here
export type ItemCardProps = {
    item: Item;
}

export function ItemCard( {item}:ItemCardProps ) {

    // handler for broken images, fallback to empty
    const brokenImageFallback = (e:React.SyntheticEvent<EventTarget>) => {
        // event e needs to be casted as HTMLInputElement or else TS will show this as an error
        let target = e.target as HTMLInputElement;
        target.src = "/images/empty_item.png";
    }

    return (
        <div className="itemCard mt-4">
            <p><img onError={brokenImageFallback} src={`/storage/${item.images && item.images[0].image}`} alt={item.title} /></p>
            <div className="itemCardContent">
                <p className="text-lg">{item.title}</p>
                <div className="mb-8 py-4 px-1 flex flex-row justify-between">
                    <p><span className="text-slate-800">Price:</span> {item.price}</p>
                    <p><span className="text-slate-800">Seller:</span> {item.seller?.username}</p>
                </div>

                {item.lastBid && <ItemCardLastBid lastBid={item.lastBid} /> }
            </div>
        </div>
    );
}