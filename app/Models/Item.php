<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;


    /**
     * Get the seller associated with the item.
     */
    public function seller()
    {
        return $this->hasOne(User::class, 'id', 'seller_id');
    }

    /**
     * Get the buyer associated with the item.
     */
    public function buyer()
    {
        return $this->hasOne(User::class, 'id', 'buyer_id');
    }

    /**
     * Get the category associated with the item.
     */
    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }    
}
