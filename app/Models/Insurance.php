<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insurance extends Model
{
    use HasFactory;

    static function isInsurance($id)
    {
        return Insurance::where('user_id',$id)->first();
    }
}
