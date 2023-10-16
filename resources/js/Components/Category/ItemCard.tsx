import { Item } from "@/types";

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
        <div className="itemCard">
            <p><img src={`/storage/${item.images[0].image}`} alt={item.title} /></p>
            <div className="itemCardContent">
                <p className="text-lg">{item.title}</p>
                <p className="mt-2">Price: {item.price}</p>
                <p className="">Seller: {item.selsler?.username}</p>
                </div>
        </div>
    );
}