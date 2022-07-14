<?php

namespace App\Models\Product;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPrice extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function product()
    {
        return $this->hasOne(Product::class);
    }
    
    public function user()
    {
        return $this->hasOne(User::class);
    }
    
    public function shopping_for_others()
    {
        //
    }
}
