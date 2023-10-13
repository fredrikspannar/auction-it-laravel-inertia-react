<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use GuzzleHttp\Client;

use Webinvader\Faker\Provider\EnglishWord;

use \Faker\Factory as Faker;
use \App\Models\Category;

class CategorySeeder extends Seeder
{

    private $guzzleClient = false;

    public function __construct($attributes = array())
    {
        //parent::__construct($attributes);

        // create guzzle client
        $this->guzzleClient = new Client();
    }

    // helper function to generate an category image
    private function getCategoryImage($category_id) {
        // setup path
        $category_path = storage_path('app/public/category');


        $response = $this->guzzleClient->request('GET', "https://picsum.photos/800/200", 
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
                throw("getCategoryImage has invalid image extension {$ext}");
            }

            // get results and save to file
            file_put_contents("{$category_path}/category_{$category_id}.{$ext}", $response->getBody());

        } else {

            // some error occured
            throw( "FAILED to get category image from picsum.photos, StatusCode: $response->getStatusCode()");
        }

        return "category/category_{$category_id}.png";
    }


    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // setup path
        $category_path = storage_path('app/public/category');
        if ( !file_exists($category_path) ) mkdir($category_path);

        // 6 main categories
        for($i=0; $i<12; $i++) {

            // create category
            $parent_id = Category::factory()->create()->id;

            // create category image and update row
            $categoryImage = $this->getCategoryImage($parent_id);
            Category::where('id', $parent_id)->first()->update([ 'image' => $categoryImage ]);

            // level 1 sub-categories to parent
            $parent_level1_subcategories = rand(1,5);
            for($p1=0; $p1<$parent_level1_subcategories; $p1++) {

                // create category
                $parent_level1_id = Category::factory([ 'parent_id' => $parent_id ])->create()->id;

                // create category image and update row
                $categoryImage = $this->getCategoryImage($parent_level1_id);
                Category::where('id', $parent_level1_id)->first()->update([ 'image' => $categoryImage ]);


                // level 2 sub-categories to parent
                $parent_level2_subcategories = rand(1,3);
                for($p2=0; $p2<$parent_level2_subcategories; $p2++) {
                    
                    // create category
                    $parent_level2_id = Category::factory([ 'parent_id' => $parent_level1_id ])->create()->id;

                    // create category image and update row
                    $categoryImage = $this->getCategoryImage($parent_level2_id);
                    Category::where('id', $parent_level2_id)->first()->update([ 'image' => $categoryImage ]);
                }

            }

        }

    }
}
