<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use GuzzleHttp\Client;

use App\Models\User;

class UserSeeder extends Seeder
{

    private $guzzleClient = false;
    public function __construct($attributes = array())
    {
        //parent::__construct($attributes);

        // create guzzle client
        $this->guzzleClient = new Client();
    }

    // get data from randomuser.me API
    private function getRandomUserData($gender="female", $results=100) {

        $json_data_path = storage_path('app/data');
        $json_data_filepath = $json_data_path."/randomuser.me.{$gender}.json";
        $data = false;

        if ( !file_exists($json_data_filepath) ) {
            
            $response = $this->guzzleClient->request('GET', "https://randomuser.me/api/?gender={$gender}&results={$results}", 
                                        array(  'verify' => false,
                                                'headers' => array( 'Content-Type' => 'application/json')
                                        ) );

            if ( $response->getStatusCode() == 200 ) {
                // get results and save to file
                $data = json_decode($response->getBody())->results;
                file_put_contents($json_data_filepath, json_encode($data));

            } else {

                // some error occured
                throw( "FAILED to get JSON data from randomuser.me. StatusCode: $response->getStatusCode()");
            }

        } else {
            // read data file
            $data = json_decode(file_get_contents($json_data_filepath));
            
        }

        return $data;
    }

    // get profile image
    private function getProfileImage($url, $save_to, $ext) {

        $content_type = "";
        if ( $ext == "jpg" ) {
            $content_type = "image/jpeg";
        } else if ( $ext == "png" ) {
            $content_type = "image/png";
        } else {
            throw("getProfileImage has invalid image extension {$ext}");
        }

        $response = $this->guzzleClient->request('GET', $url, 
                                        array(  'verify' => false,
                                                'headers' => array( 'Content-Type' => $content_type)
                                        ) );

        if ( $response->getStatusCode() == 200 ) {
            // get results and save to file
            file_put_contents($save_to, $response->getBody());

            // do some processing of image to obfuscate
            $image = imagecreatefromjpeg($save_to);

            $img_width = imagesx($image);
            $img_height = imagesy($image);

            // add filters
            imagefilter($image, IMG_FILTER_MEAN_REMOVAL);
            imagefilter($image, IMG_FILTER_COLORIZE, rand(20,160), rand(20,160), 40);

            // add image credit
            $red = imagecolorallocate($image, 200, 0, 0);
            imagestring($image, 3, $img_width/20, $img_height/40, 'Image credit:', $red);
            imagestring($image, 3, $img_width/20, ($img_height/40)+10, 'randomuser.me', $red);

            // save processed
            imagejpeg($image, $save_to);

            // free memory
            imagedestroy($image);
        } else {

            // some error occured
            throw( "FAILED to get image from randomuser.me, StatusCode: $response->getStatusCode()");
        }

    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        // fetch female user data from randomuser.me and then send to processing
        $this->processRandomUserData( $this->getRandomUserData("female", 10) );

        // fetch male user data from randomuser.me and then send to processing
        $this->processRandomUserData( $this->getRandomUserData("male", 10) );

    }

    // refactored function
    private function processRandomUserData($data) {

        foreach($data as $u) {
        
            // insert into table
            $user_id = User::factory()->create([
                'name' => (string)$u->name->first." ".(string)$u->name->last,
                'username' => (string)$u->login->username,
                'city' => (string)$u->location->city,
                'state' => (string)$u->location->state,
                'country' => (string)$u->location->country,
                'location' => json_encode($u->location->coordinates)
            ])->id;

            $user = $country = User::where('id', $user_id)->first();

            // user storage path
            $user_path = storage_path('app/public/user');
            if ( !file_exists($user_path) ) mkdir($user_path);

            $user_storage_path = storage_path("app/public/user/$user_id");
            if ( !file_exists($user_storage_path) ) mkdir($user_storage_path);

            // get profile image
            $ext = false;

            // check extension
            if ( str_contains((string)$u->picture->large, 'jpg') || str_contains((string)$u->picture->large, 'jpeg') ) {
                $ext = 'jpg';
            } else if ( str_contains((string)$u->picture->large, 'png') ) {
                $ext = 'png';
            }

            // only get if jpg or png
            if ( $ext !== false ) {
                $user_profile_image_path = "{$user_storage_path}/profile.{$ext}";
                $this->getProfileImage((string)$u->picture->large, $user_profile_image_path, $ext);

                // update row
                $user->update(['profile_image' => "user/{$user_id}/profile.{$ext}"]);
            }

        }
    }
}
