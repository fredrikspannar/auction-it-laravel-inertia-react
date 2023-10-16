import React, { useState, useEffect } from 'react';
import Layout from "@/Layouts/Layout"
import { PageProps } from '@/types';
import {Category} from "@/types";
import CategoryCardLoop from '@/Components/Category/CategoryCardLoop';

import { Flipper, Flipped } from "react-flip-toolkit";


export default function Home ({ auth, top_category_names }:PageProps<{top_category_names:string[]}>) {
    const [topCategoryData, setTopCategoryData] = useState(top_category_names);
    

    // run effect only on load
    useEffect(() => {
        let flipInterval:number=0;

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
            
            {/*<CategoryCardLoop categories={categories} isSiteHome={true} isMainCategories={true} />*/}

            <div className="lg:w-3/4 lg:mx-auto text-2xl font-bold mt-8">
                <p>The easiest site to sell that stuff in your garage that you don't need!</p>
                <br/>
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


        </Layout>
    )
}

