<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Option extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('options')->insert([
            [
                'name' => 'paginate_products',
                'value' => json_encode(12),
            ],[
                'name' => 'product_show_price_coming_soon',
                'value' => json_encode(1),
            ],[
                'name' => 'product_show_price_cancel',
                'value' => json_encode(1),
            ],[
                'name' => 'product_show_bought',
                'value' => json_encode(1),
            ],[
                'name' => 'product_show_location_cart',
                'value' => json_encode(1),
            ],[
                'name' => 'paginate_product_comments',
                'value' => json_encode(10),
            ],[
                'name' => 'paginate_product_comments_subset',
                'value' => json_encode(5),
            ],
        ]);
    }
}
