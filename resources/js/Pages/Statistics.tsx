
import Layout from "@/Layouts/Layout"
import { PageProps } from '@/types';
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement, Legend} from 'chart.js'
import { UsersBuyersSellersType, ItemsBidsType, ChartType } from "@/types";

//setup chart.js which plugins to use
Chart.register(ArcElement, Legend);


export default function Statistics ({ auth, usersBuyersSellers, itemsBids }:PageProps<{usersBuyersSellers:UsersBuyersSellersType, itemsBids:ItemsBidsType }>) {

    // create datasats with labels and colors
    const usersBuyersSellersChart:ChartType = {
        labels: [`Users (${usersBuyersSellers.userCount})`, `Sellers (${usersBuyersSellers.sellerCount})`, `Buyers (${usersBuyersSellers.buyerCount})`],
        datasets: [
            {
                data: [ usersBuyersSellers.userCount, usersBuyersSellers.sellerCount, usersBuyersSellers.buyerCount ],
                backgroundColor: [
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ]
            }                               
        ]
    }

    const itemBidsChart:ChartType = {
        labels: [`Auctions (${itemsBids.itemCount})`, `Bids (${itemsBids.bidCount})`],
        datasets: [
            {
                data: [ itemsBids.itemCount, itemsBids.bidCount],
                backgroundColor: [
                    "#e9967a",
                    "#23297a"
                ]
            }                               
        ]
    }

    // render page
    return (
        <Layout auth={auth}>
            
                <div className="flex space-x-20  mt-12">
                    <div className="max-w-lg">
                        <h2 className="mb-4 text-xl font-bold">Number of users vs sellers vs buyers</h2>
                        <Pie data={usersBuyersSellersChart} className="!w-96 !h-96" />
                    </div>

                    <div className="max-w-lg">
                        <h2 className="mb-4 text-xl font-bold">Number of auctions and bids</h2>
                        <Pie data={itemBidsChart} className="!w-96 !h-96" />
                    </div>
                </div>

        </Layout>
    )
}

