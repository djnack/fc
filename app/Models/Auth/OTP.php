<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OTP extends Model
{
    use HasFactory;
    public $timestamps = false;
    
    static function getRandomCode()
    {
        $num = 6;
        $randomInteger = '';

        for ($i = 0; $i < $num; $i++) {
            $randomInteger .= rand(0, 9);
        }
        return $randomInteger;
    }
}
