<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use GuzzleHttp\Client;
use \Faker\Factory as Faker;

use \App\Models\Item;
use \App\Models\ItemImages;

class ItemImagesSeeder extends Seeder
{

    private $guzzleClient = false;

    public function __construct($attributes = array())
    {
        //parent::__construct($attributes);

        // create guzzle client
        $this->guzzleClient = new Client();     
    }


    // helper function to get an item image
    private function getItemImage($item_id) {
        // setup path
        $item_path = storage_path("app/public/item/{$item_id}");


        $response = $this->guzzleClient->request('GET', "https://loremflickr.com/640/480/products", 
                                        array(  'verify' => false )
                                    );

        if ( $response->getStatusCode() == 200 ) {
            $content_type = (string)$response->getHeader('content-type')[0];

            $ext = "";
            if ( $content_type = "image/jpeg" ) {
                $ext = "jpg";
            } else if ( $content_type = "image/png" ) {
                $ext = "png";
            } else {
                throw("getItemImage has invalid image extension {$ext}");
            }

            // get results and save to file
            file_put_contents("{$item_path}/item_{$item_id}.{$ext}", $response->getBody());

        } else {

            // some error occured
            throw( "FAILED to get item image from loremflickr, StatusCode: $response->getStatusCode()");
        }

        return "item/item_{$item_id}.{$ext}";
    }


    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // setup path
        $item_path = storage_path('app/public/item');
        if ( !file_exists($item_path) ) mkdir($item_path);

        // get all items 
        $items = Item::select('id')->get();

        foreach($items as $item) {

            // setup path for item
            if ( !file_exists($item_path."/{$item->id}") ) mkdir($item_path."/{$item->id}");

            ItemImages::create([ 'item_id' => $item->id, 'image' => $this->getItemImage($item->id) ]);

        }

    }
}
