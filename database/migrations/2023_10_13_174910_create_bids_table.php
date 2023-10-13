<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bids', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('item_id');
            $table->foreign('item_id')->references('id')->on('items');                        

            $table->float('price', 8, 2);

            $table->unsignedBigInteger('bidder_id');
            $table->foreign('bidder_id')->references('id')->on('users');            

            $table->timestamp('created_at', $precision = 0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bids');
    }
};
