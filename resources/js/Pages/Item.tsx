import React, { useState } from 'react';
import Layout from "@/Layouts/Layout"
import { PageProps, Item, Category, ItemImage } from '@/types';
import {Currency} from '@/Components/Shared/Currency';

export default function ItemPage ({ auth, item, parents }:PageProps<{item:Item, parents:Category[]}>) {
    const [ imageIndex, setImageIndex ] = useState(0);
    
    // function to get only the current image at index
    const getCurrentImageSrc = ():string => {
        
        // filter all images
        const selectedImage = item.images?.filter( (image, index) => index == imageIndex );

        // return only the image src
        return selectedImage ? '/storage/' + selectedImage[0].image : "";
    }

    // handler for broken images, fallback to empty
    const brokenImageFallback = (e:React.SyntheticEvent<EventTarget>) => {
        // event e needs to be casted as HTMLInputElement or else TS will show this as an error
        let target = e.target as HTMLInputElement;
        target.src = "/images/empty_item.png";
    }

    return (
        <Layout auth={auth}>
            
            <div className="lg:w-3/4 mx-auto mt-8">
                <div className="flex flex-row justify-between">
                    <div className="lg:w-3/5 mx-auto mt-8">
                        <div className="">
                            <img src={getCurrentImageSrc()} onError={brokenImageFallback} alt="" />
                        </div>
                        <div className="mt-8 p-4 bg-slate-200">
                            <div className="flex flex-row justify-center">
                                {item.images?.map((img, index) => (
                                    <img src={`/storage/${img.image}`} className="ml-2 mr-2 w-16 hover:opacity-60 itemImageCarousel" onClick={() => setImageIndex(index) } alt="" title="Click to show image" />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-2/5 mx-auto space-y-3 lg:ml-8">
                        <p className="text-3xl">{item.title}</p>
                        <p className="flex flex-row justify-between text-xl">
                            <span className="text-slate-800">
                                {item.lastBid ? 'Winning bid:' : 'Price:'}
                            </span>
                            <span><Currency price={item.lastBid ? item.lastBid.price : item.price} /></span>
                        </p>
                        <p className="flex flex-row justify-between text-xl">
                            <span className="text-slate-800">
                                Ends:
                            </span>
                            <span>{item.ends_at.toString()}</span>
                        </p>
                        <p className="flex flex-row justify-between text-xl">
                            <span className="text-slate-800">
                                Bids:
                            </span>
                            <span>{item.bids ? item.bids.length : 0}</span>
                        </p>

                        <div className="pt-8 pb-8">
                            <p className="border-yellow-500 border-t-[2px] pt-8 text-slate-800 text-center">Place a bid of more than <Currency price={item.lastBid ? item.lastBid.price : item.price} /></p>
                            <p className="bg-slate-50 rounded-sm flex flex-row justify-between border-[1px] px-4 py-2 mt-2">
                                <input type="text" className="w-full block border-0 bg-slate-50" placeholder="Write your bid..." />
                                <span className="ml-2 flex justify-center items-center text-slate-400"><Currency price={false} /></span>
                            </p>
                            <p className="mt-2">
                                <button className="primaryButton w-full mt-2 rounded-sm text-lg !py-2">Place my bid</button>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <span className="text-slate-800 block border-yellow-500 mb-4 border-b-[2px]">Description:</span>
                    {item.description}
                </div>
            </div>

        </Layout>
    )
}

