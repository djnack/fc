<?php

namespace Database\Seeders\Role;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Permissions extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->insert([
            [
                'id' => 1,
                'name' => 'create_sites',
                'label' => 'create_sites'
            ],
            [
                'id' => 2,
                'name' => 'delete_sites',
                'label' => 'delete_sites'
            ],
            [
                'id' => 3,
                'name' => 'manage_network',
                'label' => 'manage_network'
            ],
            [
                'id' => 4,
                'name' => 'manage_sites',
                'label' => 'manage_sites'
            ],
            [
                'id' => 5,
                'name' => 'manage_network_users',
                'label' => 'manage_network_users'
            ],
            [
                'id' => 6,
                'name' => 'manage_network_plugins',
                'label' => 'manage_network_plugins'
            ],
            [
                'id' => 7,
                'name' => 'manage_network_themes',
                'label' => 'manage_network_themes'
            ],
            [
                'id' => 8,
                'name' => 'manage_network_options',
                'label' => 'manage_network_options'
            ],
            [
                'id' => 9,
                'name' => 'upload_plugins',
                'label' => 'upload_plugins'
            ],
            [
                'id' => 10,
                'name' => 'upload_themes',
                'label' => 'upload_themes'
            ],
            [
                'id' => 11,
                'name' => 'upgrade_network',
                'label' => 'upgrade_network'
            ],
            [
                'id' => 12,
                'name' => 'setup_network',
                'label' => 'setup_network'
            ],
            [
                'id' => 13,
                'name' => 'activate_plugins',
                'label' => 'activate_plugins'
            ],
            [
                'id' => 14,
                'name' => 'create_users',
                'label' => 'create_users'
            ],
            [
                'id' => 15,
                'name' => 'delete_plugins',
                'label' => 'delete_plugins'
            ],
            [
                'id' => 16,
                'name' => 'delete_themes',
                'label' => 'delete_themes'
            ],
            [
                'id' => 17,
                'name' => 'delete_users',
                'label' => 'delete_users'
            ],
            [
                'id' => 18,
                'name' => 'edit_files',
                'label' => 'edit_files'
            ],
            [
                'id' => 19,
                'name' => 'edit_plugins',
                'label' => 'edit_plugins'
            ],
            [
                'id' => 20,
                'name' => 'edit_theme_options',
                'label' => 'edit_theme_options'
            ],
            [
                'id' => 21,
                'name' => 'edit_themes',
                'label' => 'edit_themes'
            ],
            [
                'id' => 22,
                'name' => 'edit_users',
                'label' => 'edit_users'
            ],
            [
                'id' => 23,
                'name' => 'export',
                'label' => 'export'
            ],
            [
                'id' => 24,
                'name' => 'import',
                'label' => 'import'
            ],
            [
                'id' => 25,
                'name' => 'install_plugins',
                'label' => 'install_plugins'
            ],
            [
                'id' => 26,
                'name' => 'install_themes',
                'label' => 'install_themes'
            ],
            [
                'id' => 27,
                'name' => 'list_users',
                'label' => 'list_users'
            ],
            [
                'id' => 28,
                'name' => 'manage_options',
                'label' => 'manage_options'
            ],
            [
                'id' => 29,
                'name' => 'promote_users',
                'label' => 'promote_users'
            ],
            [
                'id' => 30,
                'name' => 'remove_users',
                'label' => 'remove_users'
            ],
            [
                'id' => 31,
                'name' => 'switch_themes',
                'label' => 'switch_themes'
            ],
            [
                'id' => 32,
                'name' => 'update_core',
                'label' => 'update_core'
            ],
            [
                'id' => 33,
                'name' => 'update_plugins',
                'label' => 'update_plugins'
            ],
            [
                'id' => 34,
                'name' => 'update_themes',
                'label' => 'update_themes'
            ],
            [
                'id' => 35,
                'name' => 'edit_dashboard',
                'label' => 'edit_dashboard'
            ],
            [
                'id' => 36,
                'name' => 'customize',
                'label' => 'customize'
            ],
            [
                'id' => 37,
                'name' => 'delete_site',
                'label' => 'delete_site'
            ],
            [
                'id' => 38,
                'name' => 'moderate_comments',
                'label' => 'moderate_comments'
            ],
            [
                'id' => 39,
                'name' => 'manage_categories',
                'label' => 'manage_categories'
            ],
            [
                'id' => 40,
                'name' => 'manage_links',
                'label' => 'manage_links'
            ],
            [
                'id' => 41,
                'name' => 'edit_others_posts',
                'label' => 'edit_others_posts'
            ],
            [
                'id' => 42,
                'name' => 'edit_pages',
                'label' => 'edit_pages'
            ],
            [
                'id' => 43,
                'name' => 'edit_others_pages',
                'label' => 'edit_others_pages'
            ],
            [
                'id' => 44,
                'name' => 'edit_published_pages',
                'label' => 'edit_published_pages'
            ],
            [
                'id' => 45,
                'name' => 'publish_pages',
                'label' => 'publish_pages'
            ],
            [
                'id' => 46,
                'name' => 'delete_pages',
                'label' => 'delete_pages'
            ],
            [
                'id' => 47,
                'name' => 'delete_others_pages',
                'label' => 'delete_others_pages'
            ],
            [
                'id' => 48,
                'name' => 'delete_published_pages',
                'label' => 'delete_published_pages'
            ],
            [
                'id' => 49,
                'name' => 'delete_others_posts',
                'label' => 'delete_others_posts'
            ],
            [
                'id' => 50,
                'name' => 'delete_private_posts',
                'label' => 'delete_private_posts'
            ],
            [
                'id' => 51,
                'name' => 'edit_private_posts',
                'label' => 'edit_private_posts'
            ],
            [
                'id' => 52,
                'name' => 'read_private_posts',
                'label' => 'read_private_posts'
            ],
            [
                'id' => 53,
                'name' => 'delete_private_pages',
                'label' => 'delete_private_pages'
            ],
            [
                'id' => 54,
                'name' => 'edit_private_pages',
                'label' => 'edit_private_pages'
            ],
            [
                'id' => 55,
                'name' => 'read_private_pages',
                'label' => 'read_private_pages'
            ],
            [
                'id' => 56,
                'name' => 'unfiltered_html',
                'label' => 'unfiltered_html'
            ],
            [
                'id' => 57,
                'name' => 'edit_published_posts',
                'label' => 'edit_published_posts'
            ],
            [
                'id' => 58,
                'name' => 'upload_files',
                'label' => 'upload_files'
            ],
            [
                'id' => 59,
                'name' => 'publish_posts',
                'label' => 'publish_posts'
            ],
            [
                'id' => 60,
                'name' => 'delete_published_posts',
                'label' => 'delete_published_posts'
            ],
            [
                'id' => 61,
                'name' => 'edit_posts',
                'label' => 'edit_posts'
            ],
            [
                'id' => 62,
                'name' => 'delete_posts',
                'label' => 'delete_posts'
            ],
            [
                'id' => 63,
                'name' => 'read',
                'label' => 'read'
            ]
        ]);
    }
}
