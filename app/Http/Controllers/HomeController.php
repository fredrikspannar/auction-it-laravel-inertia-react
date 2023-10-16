<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use \App\Models\Category;
use \App\Models\Item;

class HomeController extends Controller
{
    


    public function index() {

        // get main categories ( has no parent )
        //$categories = Category::whereNull('parent_id')->get();


        // query top three categories which has the most items sold
        // map through the result so that we only return the category name
        $top_category_names = Item::selectRaw('*, COUNT(category_id) as products_count')->
                                with('category')->
                                groupBy('category_id')->
                                orderBy('products_count', 'DESC')->
                                take(5)->
                                get()->
                                map(fn($row, $key) => $row->category->name );
        

        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),

            'top_category_names' => $top_category_names,
            //'categories' => $categories
        ]);
    }


}
