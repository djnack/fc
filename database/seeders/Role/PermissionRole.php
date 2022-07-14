<?php

namespace Database\Seeders\Role;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionRole extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $table = [];
        foreach (range(1, 12) as $num) {
            array_push($table, [
                'role_id' => '1',
                'permission_id' => $num,
            ]);
        }
        foreach (range(13, 24) as $num) {
            array_push($table, [
                'role_id' => '1',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '2',
                'permission_id' => $num,
            ]);
        }
        foreach (range(25, 37) as $num) {
            array_push($table, [
                'role_id' => '1',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '2',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '3',
                'permission_id' => $num,
            ]);
        }
        foreach (range(38, 56) as $num) {
            array_push($table, [
                'role_id' => '1',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '2',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '3',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '4',
                'permission_id' => $num,
            ]);
        }
        foreach (range(57, 62) as $num) {
            array_push($table, [
                'role_id' => '1',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '2',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '3',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '4',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '5',
                'permission_id' => $num,
            ]);
        }
        foreach (range(63, 63) as $num) {
            array_push($table, [
                'role_id' => '1',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '2',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '3',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '4',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '5',
                'permission_id' => $num,
            ]);
            array_push($table, [
                'role_id' => '6',
                'permission_id' => $num,
            ]);
        }

        DB::table('permission_role')->insert($table);
    }
}
