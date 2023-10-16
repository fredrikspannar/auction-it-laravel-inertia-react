import { Item } from "@/types";
import { ItemCard } from '@/Components/Category/ItemCard';

// create types for component, this is only used here
export type ItemLoopProps = {
    items: Item[];
    categoryName:string;
}

export default function ItemLoop({items, categoryName}:ItemLoopProps) {

    // no items at all?
    if ( !items || items.length == 0 ) return null;


    return (
        <>
            <p className="text-2xl mt-8 font-bold mb-4 pb-2 border-yellow-500 border-b-[2px]">Auctions in "{categoryName}"</p>
            <div className="flex flex-row flex-wrap mt-2 justify-between mb-8">
                {items.map(item => <ItemCard item={item} />)}
            </div>
        </>
    );
}
