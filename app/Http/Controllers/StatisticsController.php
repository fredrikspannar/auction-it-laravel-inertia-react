<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

use App\Models\User;
use App\Models\Item;
use App\Models\Bid;

class StatisticsController extends Controller
{
    public function index() {

        // chart 1: users, buyers, sellers
        $userCount = User::count();
        $sellerCount = Item::whereNotNull('seller_id')->count();
        $buyerCount = Item::whereNotNull('buyer_id')->count();
        
        // chart 2: items, bids
        $itemCount = Item::count();
        $bidCount = Bid::select('item_id')->distinct()->count();

        // combine into which charts should be plotted
        $usersBuyersSellers = array(
            'userCount' => $userCount,
            'sellerCount' => $sellerCount,
            'buyerCount' => $buyerCount
        );

        $itemsBids = array(
            'itemCount' => $itemCount,
            'bidCount' => $bidCount
        );

        // return view with data
        return Inertia::render('Statistics', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),

            'usersBuyersSellers' => $usersBuyersSellers,
            'itemsBids' => $itemsBids

            //'laravelVersion' => Application::VERSION,
            //'phpVersion' => PHP_VERSION,
        ]);
    }
}
