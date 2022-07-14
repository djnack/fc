<?php

namespace App\Models;

use App\Models\Product\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    public $timestamps = false;

    // public function posts()
    // {
    //     return $this->morphedByMany(Post::class, 'taggable');
    // }

    // public function videos()
    // {
    //     return $this->morphedByMany(Video::class, 'taggable');
    // }

    public function products()
    {
        return $this->morphedByMany(Product::class, 'categoryables');
    }
}
