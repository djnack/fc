<?php

namespace Database\Seeders\Role;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Roles extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                'id' => 1,
                'name' => 'super_admin',
                'label' => 'super_admin',
            ], [
                'id' => 2,
                'name' => 'admin',
                'label' => 'admin',
            ], [
                'id' => 3,
                'name' => 'editor',
                'label' => 'editor',
            ], [
                'id' => 4,
                'name' => 'author',
                'label' => 'author',
            ], [
                'id' => 5,
                'name' => 'contributor',
                'label' => 'contributor',
            ], [
                'id' => 6,
                'name' => 'subscriber',
                'label' => 'subscriber',
            ],
        ]);
    }
}
