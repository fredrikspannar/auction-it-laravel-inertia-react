<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use \App\Models\User;
use \App\Models\Item;
use \App\Models\Category;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // count total number of users
        // and then how many of those should be sellers
        $totalUsers = User::all()->count();
        $sellersNum = rand(($totalUsers/2) - ($totalUsers/4), ($totalUsers/2) + ($totalUsers/4) );

        // get sellers starting at random index from 1 to remaning number of total - sellers
        $sellers = User::select('id')->get()->slice(rand(1,($totalUsers-$sellersNum)), $sellersNum);

        // loop through each seller
        foreach($sellers as $seller) {

            // how many items does this seller currently sell?
            $sellerItems = rand(1,12);
            for($i=0; $i<$sellerItems; $i++) {

                // get a random category that is not the first main parent
                $itemCategory = Category::whereNull('parent_id')->inRandomOrder()->first();

                // create item for seller
                Item::factory()->create([ 'seller_id' => $seller->id, 'category_id' => $itemCategory->id ]);

            }
        }


    }
}
