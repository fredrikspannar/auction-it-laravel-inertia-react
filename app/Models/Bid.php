<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class Bid extends Model
{
    use HasFactory;

    public $timestamps = false; // disable all timestamps

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'item_id', 'price', 'bidder_id', 'created_at'
    ];

    public static function boot()
    {
        parent::boot();

        // only set created_at when a new row is created
        static::creating(function ($model) {
            if ( !$model->created_at ) $model->created_at = $model->freshTimestamp();
        });
    }    

    public function bidder() {
        return  $this->hasOne(User::class, 'id', 'bidder_id');
    }
}
