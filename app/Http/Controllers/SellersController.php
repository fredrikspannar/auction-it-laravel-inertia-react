<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use \App\Models\User;
use \App\Models\Item;

class SellersController extends Controller
{
    public function index() {

        // get all users via items that is selling
        /*
            SELECT users.id, users.username, (SELECT COUNT(*) from items WHERE seller_id = users.id ) as selling_items_count FROM items inner join users on users.id = items.seller_id group by items.seller_id
        */
        $sellers = DB::table('items')
                        ->select('users.id', 'users.username', 'users.profile_image', 'users.name', 'users.email', DB::raw('(SELECT COUNT(*) from items WHERE seller_id = users.id ) as selling_items_count'))
                        ->join('users','users.id', '=', 'items.seller_id')
                        ->groupBy('items.seller_id')
                        ->get();

        return Inertia::render('Sellers', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            
            'sellers' => $sellers
        ]);
    }


    // show single seller ( = user )
    public function showUser($username) {

        // get user with items and items->itemimages etc...
        $user = User::with('items')->with('items.images')->where('username', $username)->first();


        return Inertia::render('SellerUser', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            
            'user' => $user
        ]);
    }

}
