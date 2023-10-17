<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use \App\Models\Item;
use \App\Models\Category;

class ItemController extends Controller
{

    public function index($id) {
        // get item with relations
        $item = Item::with('bids')->with('category')->with('images')->with('seller')->where('id', $id)->first();

        
        // also get parent
        $parent = null;
        $fallbackCount = 0;
        $parentResult = $parents = [];
        /*do {
            // increase fallback so we don't end up in an infinate loop
            $fallbackCount++;
            if ($fallbackCount>100) break; // stop at 100

            $nextParentId = ( $parent == null ? $item->category_id : $parent->parent_id );

            // get parent
            $parent = Category::where('id', (int)$nextParentId)->first(); // first() returns null if not found
            if ( $parent !== null) {
                array_push($parentResult, $parent); // save parent
            
            } else {
                // exit do-while, no more to query
                break;
            }
            
        } while ($parent->parent_id === null); // if parent is not root, then continue

        // mash result to use as breadcrumb path - we only really need name but gather id and parent_id also if we should need that
        $parents = array_map(fn ($p) => [ 'id' => $p->id, 'name' => $p->name, 'parent_id' => $p->parent_id,] ,$parentResult);
        */

        return Inertia::render('Item', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),

            'item' => $item,
            'parents' => $parents
        ]);
    }

}
