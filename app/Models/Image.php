<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;


    public function products()
    {
        return $this->morphedByMany(Product::class, 'imageables');
    }

    public function users()
    {
        return $this->morphedByMany(User::class, 'imageables');
    }
}


// >>> $user->images()->attach($image,['detail'=>'hhhhhhh'])
// >>> $user->images()->withPivot('detail')->get()
// >>> $user->images()->get()
// >>> $user->images()->attach($image)
// >>> $user->images()->detach($image)
// >>> $user->images()->save($image)
// >>> Models\User::find(1)->images()->wherePivot('detail','yes')->get()
