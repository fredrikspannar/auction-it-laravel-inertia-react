<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use \App\Models\Bid;
use \App\Models\ItemImages;

class Item extends Model
{
    use HasFactory;

    // extra attributes
    protected $appends = [ 'lastBid', 'smallExcerpt' ];

    // get attribute for the last bidder for the item
    public function getLastBidAttribute() {
        return Bid::with('bidder')->where('item_id', $this->id)->orderBy('created_at', 'DESC')->first();
    }

    public function getSmallExcerptAttribute() {
        return substr($this->description, 0, 60).' [...]';
    }

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

    // get images
    public function images() {
        return $this->hasMany(ItemImages::class, 'item_id', 'id');
    }
}
