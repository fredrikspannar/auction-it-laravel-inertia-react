<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use \App\Models\Category;

class HomeController extends Controller
{
    


    public function index() {

        // get main categories ( has no parent )
        $categories = Category::whereNull('parent_id')->get();



        

        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            
            'categories' => $categories
        ]);
    }


}
