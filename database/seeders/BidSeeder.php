<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

use \App\Models\User;
use \App\Models\Item;
use \App\Models\Bid;

class BidSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * OPTIONAL: When running the command create:bids - this command can take in a parameter with an date,
     * this is then passed to this seeder as $fromDate
     */
    public function run($fromDate=false): void
    {
        // get all items in auction which does not have a buyer
        $itemCount = Item::count();
        $items = Item::whereNull('buyer_id')->inRandomOrder()->limit( round($itemCount/2,0) )->get();

        // create a flat array with id to sellers
        $sellers = array_flatten( $items->map(function ($items) {
            return (int)$items->seller_id;
        })->toArray() );


        // create bids for buyers
        foreach($items as $item) {

            if ( empty($item) || !isset($item->id) ) continue;

            // get buyers ( which is not a seller )
            $buyers = User::select('id')->whereNotIn('id',$sellers)->limit( rand(1,8) )->inRandomOrder()->get();

            // set starting bid - either half the price or at the asking price
            $lastBid = rand(1,2) == 2 ? $item->price /2 : $item->price;
            $lastBidDate = !empty($fromDate) ? $fromDate.' 01:01:01' : $item->created_at;

            // create a bid for each buyer
            foreach($buyers as $buyer) {
                // create a new bid price from 1 to 1/4 of the asking price
                $newBid = $lastBid;
                while ($newBid == $lastBid) { // wrap in a while-loop so the next is not the same as the last
                    $newBid += rand(1, round($item->price/4, 2));
                }

                // create a new bid date
                $newBidDate = $lastBidDate;

                $loopFailSafeCount = 0;
                $startingHour = 0;
                while ($newBidDate == $lastBidDate || ($newBidDate < $item->created_at && empty($fromDate))) {
                    $startingHour++;
                    $nextHour = rand($startingHour, 48);
                    $newBidDate = date('Y-m-d H:i:s', strtotime("+{$nextHour} hours", strtotime($lastBidDate)));

                    // failsafe so we don't get stuck in an infinite loop
                    $loopFailSafeCount++;
                    if ( $loopFailSafeCount >= 1000 ) break;
                }
                

                // save bid
                Bid::create([ 'item_id' => $item->id, 'price' => $lastBid, 'bidder_id' => $buyer->id, 'created_at' => $newBidDate ]);

                // save for next round
                $lastBid = $newBid;
                $lastBidDate = $newBidDate;
            }

        }

    }
}
