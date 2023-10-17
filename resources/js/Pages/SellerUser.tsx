import React, { useState } from 'react';
import Layout from "@/Layouts/Layout"
import { PageProps, User, Item } from '@/types';
import ItemLoop from '@/Components/Category/ItemLoop';

// extend user since property items is only used here
interface Seller extends User {
    items:Item[];
    city: string;
    state: string;
    country: string;
    location: string;
}

export default function SellerUser ({ auth, user }:PageProps< { user:Seller } >) {

    // handler for broken images, fallback to empty
    const brokenImageFallback = (e:React.SyntheticEvent<EventTarget>) => {
        // event e needs to be casted as HTMLInputElement or else TS will show this as an error
        let target = e.target as HTMLInputElement;
        target.src = "/images/empty_user.png";
    }


    return (
        <Layout auth={auth}>
            
            <div className="lg:w-3/4 mx-auto mt-8">
                <p className="border-yellow-500 border-b-[2px] text-2xl">Seller: {user.name}</p>
                <div className="mb-8 lg:mb-16 flex lg:flex-row">
                    <div className="lg:w-1/3">
                        <img src={`/storage/${user.profile_image}`} className="lg:w-full" onError={brokenImageFallback} alt={user.username} />
                    </div>
                    <div className="lg:w-1/3 lg:mt-8 lg:pr-6 lg:pl-2">
                        <p className="flex flex-row justify-between"><span className="text-slate-800">Username:</span> {user.username}</p>
                        <p className="flex flex-row justify-between"><span className="text-slate-800">City:</span> {user.city}</p>
                        <p className="flex flex-row justify-between"><span className="text-slate-800">State:</span> {user.state}</p>
                        <p className="flex flex-row justify-between"><span className="text-slate-800">Country:</span> {user.country}</p>
                    </div>
                    <div className="lg:w-1/3">

                    </div>
                </div>

                <p className="border-yellow-500 border-b-[2px] text-2xl">Seller auctions</p>
                <div className="">
                    <ItemLoop items={user.items} smallerItemCard={true} hideSeller={true} />
                </div>
            </div>

        </Layout>
    )
}

