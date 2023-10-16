import React, { useState, useEffect } from 'react';
import Layout from "@/Layouts/Layout"
import { PageProps } from '@/types';
import { Flipper, Flipped } from "react-flip-toolkit";
import {Category} from '@/types';

export default function Home ({ auth, top_category_names, categories }:PageProps< { top_category_names:string[], categories:Category[] } >) {
    const [topCategoryData, setTopCategoryData] = useState(top_category_names);
    

    // run effect only on load
    useEffect(() => {
        let flipInterval;

        flipInterval = setInterval(() => {
            // shuffle array
            const newData = topCategoryData.map(function(n){ return [Math.random(), n] }).sort().map(function(n){ return n[1] });

            setTopCategoryData( newData );

        },3000);

        // cleanup
        return () => {
            clearInterval(flipInterval);
        };

    }, []);

    return (
        <Layout auth={auth}>
            
            <div className="text-2xl font-bold p-4 lg:p-8 lg:mt-24 flex flex-row lg:w-3/4 lg:mx-auto border-2 border-slate-600 rounded-2xl shadow-xl bg-slate-100">
                <div className="w-3/4 flex flex-col justify-around">
                    <p className="text-4xl">The easiest site to sell that stuff in your garage that you don't need! <span className="text-lg text-gray-700">( except cats )</span></p>
                    
                    <div>
                        <p>Today our top 5 popular categories are...</p>
                        <Flipper flipKey={topCategoryData.join("")}>
                            <ul className="flex flex-row">
                                {topCategoryData.map((name, index) => (
                                <Flipped key={index} flipId={index}>
                                    <li className={`${index > 0 ? 'pl-2' : ''} pr-2 text-cyan-700`}>{name}</li>
                                </Flipped>
                                ))}
                            </ul>
                        </Flipper>  
                    </div>

                    <div className="p-3 px-6 bg-slate-300 w-3/4 rounded-lg shadow-xl flex flex-col opacity-90">
                        <q className="text-slate-800">Our crap could be Your crap</q>              
                        <em className="block self-end text-xl text-slate-600">- Unkown</em>
                    </div>
                </div>
                <div className="w-1/4">
                    <img src="/images/box-cat.webp" alt="" />
                </div>
            </div>


        </Layout>
    )
}

