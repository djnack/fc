<?php

namespace Database\Seeders\Role;

use Illuminate\Database\Seeder;

class Role extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            Roles::class,
            // Permissions::class,
            // PermissionRole::class,
        ]);
    }
}
