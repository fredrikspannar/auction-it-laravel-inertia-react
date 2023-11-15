export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    children?: JSX.Element | JSX.Element[] |string;
};

// AuctionIT types
export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    email_verified_at?: string;
    selling_items_count?: number;
    profile_image?:string;
}

export interface Category {
    id: number;
    name: string;
    image: string;
    parent_id: number;
    children?: Category[];
    productsCount?:number;
}

export interface Bid {
    id: number;
    item_id: number;
    price: number;
    bidder_id: number;
    created_at: Date;
    bidder?: User;
}

export interface ItemImage {
    id: number;
    item_id: number;
    image:string;
}

export interface Item {
    id: number;
    title: string;
    price: number;
    description: string;
    ends_at: Date;
    category_id: number;
    seller_id: number;
    buyer_id: number;
    created_at: Date;
    updated_at: Date;
    lastBid?:Bid;
    seller?: User;
    images?:ItemImage[];
    category?:Category;
    bids?:Bid[];
}

// chart types
export type UsersBuyersSellersType = {
    userCount:number;
    sellerCount:number;
    buyerCount:number;
}

export type ItemsBidsType = {
    itemCount:number;
    bidCount:number;
}

export type DataChartType = {
    data:number[];
    backgroundColor?:string[];
}

export type ChartType = {
    labels: string[];
    datasets: DataChartType[];
}



