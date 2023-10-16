<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use \App\Models\Item;

class ItemController extends Controller
{

    public function index($id) {
        $item = Item::with('bids')->with('category')->with('images')->with('seller')->where('id', $id)->first();


        return Inertia::render('Item', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),

            'item' => $item
        ]);
    }

}
