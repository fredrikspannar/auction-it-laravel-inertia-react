<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // generate some Items as closed with a date that has passed
        $is_closed = rand(1,2);
        $ends_at = date('Y-m-d', strtotime("+30 days"));
        if ( $is_closed == 2 ) {
            $ends_at = date('Y-m-d', strtotime("-".rand(7,90)." days"));
        }

        return [
            'title' => ucfirst($this->faker->sentence(rand(3,8))),
            'price' => (float)rand(2,4).".".rand(0,2),
            'description' => $this->faker->paragraphs(rand(2,6), true),
            'ends_at' => $ends_at
        ];
    }
}
