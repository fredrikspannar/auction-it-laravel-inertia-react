<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

use App\Models\User;
use App\Models\Item;
use App\Models\Bid;

class StatisticsController extends Controller
{
    public function index() {

        // ---------------------------------------------
        // chart 1: users, buyers, sellers
        $userCount = User::count();
        $sellerCount = Item::whereNotNull('seller_id')->count();
        $buyerCount = Item::whereNotNull('buyer_id')->count();
        

        // ---------------------------------------------
        // chart 2: items, bids
        $itemCount = Item::count();
        $bidCount = Bid::select('item_id')->distinct()->count();


        // ---------------------------------------------
        // chart 3: number of bids per month, the last six months
        $currentDate = date("Y-m-d");
        $sixMonthsDate = date("Y-m-d",strtotime('-6 months'));

        $timelineTitle = ""; // frontend title of diagam which depends on the gathered data

        // query data - group by date
        $bids = Bid::SelectRaw('SUBSTR(created_at,1,10) as DateStr, COUNT(SUBSTR(created_at,1,10)) as DateCnt')->where('created_at','>=',$sixMonthsDate.' 00:00:01')->where('created_at','<=',$currentDate.' 23:59:59')->groupBy('DateStr')->get();

        // empty results? (... this could happens since we have or probably have seeded data)
        if ( empty($bids) ) {
            // .. then get all bids
            $bids = Bid::SelectRaw('SUBSTR(created_at,1,10) as DateStr, COUNT(SUBSTR(created_at,1,10)) as DateCnt')->get();
        }



        // sort bids by month if we can create a montly view
        $monthBids = array();
        $monthsLabels = array();
        foreach($bids as $dateRow) {
            $monthDate = intval( date('m', strtotime($dateRow->DateStr.' 00:00:00')) );

            // create new month item if not set starting at zero count
            if ( !isset($monthBids[$monthDate]) ) {
                $monthBids[$monthDate] = 0;
            }

            // increase bid count
            $monthBids[$monthDate] += intval($dateRow->DateCnt);

            // labels for frontend
            $monthLbl = date('F', strtotime($dateRow->DateStr.' 00:00:00'));
            if ( !in_array($monthLbl, $monthsLabels)) array_push($monthsLabels, $monthLbl);
        }

        // sort the keys only
        ksort($monthBids);

        if ( !empty($monthBids) ) {
            // only one arragated month?
            if ( count($monthBids) == 1 ) {
                // .. then show timeline diagram for that month only
                $timelineTitle = "Bids for ".date('F', strtotime($bids[0]->DateStr.' 00:00:00'));

            } else {
                $timelineTitle = "Bids from ".date('F', strtotime($bids[0]->DateStr.' 00:00:00'))." to ".date('F', strtotime($bids[count($bids)-1]->DateStr.' 00:00:00'));
            }
        }

        // ---------------------------------------------
        // combine into which charts should be plotted
        $usersBuyersSellers = array(
            'userCount' => $userCount,
            'sellerCount' => $sellerCount,
            'buyerCount' => $buyerCount
        );

        $itemsBids = array(
            'itemCount' => $itemCount,
            'bidCount' => $bidCount
        );

        // return view with data
        return Inertia::render('Statistics', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),

            'usersBuyersSellers' => $usersBuyersSellers,
            'itemsBids' => $itemsBids,

            'monthsLabels' => $monthsLabels,
            'monthBids' => $monthBids,
            'timelineTitle' => $timelineTitle,

        ]);
    }
}
