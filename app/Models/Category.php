<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Item;

class Category extends Model
{
    use HasFactory;

    // do not use timestamps for this model
    public $timestamps = false;

    // extra attributes
    protected $appends = ['children', 'productsCount'];
    
    public function getChildrenAttribute() {
        return self::where('parent_id', $this->id)->get();
    }

    public function getProductsCountAttribute() {
        return Item::where('category_id', $this->id)->count();
    }
}
