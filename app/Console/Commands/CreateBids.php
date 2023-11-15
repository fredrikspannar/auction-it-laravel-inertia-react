<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Database\Seeders\BidSeeder;

class CreateBids extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:bids {fromDate}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Runs BidSeeder with a date as a parameter';

    /**
     * Execute the console command.
     */
    public function handle(BidSeeder $seeder)
    {
        // get parameter and then run seed
        $fromDate = $this->argument('fromDate');
        $seeder->run($fromDate);

    }
}
