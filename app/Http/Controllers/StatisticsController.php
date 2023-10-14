<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class StatisticsController extends Controller
{
    public function index() {





        

        return Inertia::render('Statistics', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            //'laravelVersion' => Application::VERSION,
            //'phpVersion' => PHP_VERSION,
        ]);
    }
}
