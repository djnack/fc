<?php

namespace App\Models;

use App\Models\Auth\OTP;
use App\Models\Image;
use App\Models\Role\Role;
use App\Models\Verify\Verify;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


    protected $fillable = [
        'name', 'email', 'password',
    ];

    // public $timestamps = true;
    protected $hidden = [
        'password', 'remember_token',
    ];


    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    function getOTP()
    {
        return $this->hasMany(OTP::class)->orderByDesc('id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function hasRole($role)
    {
        if (is_string($role)) {
            return $this->roles->contain('name', $role);
        }
        return !!$role->intersect($this->roles)->count();
    }

    public function verify()
    {
        return $this->hasOne(Verify::class);
    }

    public function membership()
    {
        return $this->belongsToMany(Membership::class)->withPivot('created_at');
    }

    public function default_membership()
    {
        return Membership::first()->name;
    }



    public function getImagesAttribute($value)
    {
        $pathImage = env('PATH_IMAGE_USER');
        $base_URL = env('APP_URL');

        return $this->images()->select(['path'])->get()->mapWithKeys(function($e)use ($base_URL, $pathImage){
            return [$e->pivot->detail=>['path'=>$base_URL . $pathImage .$e->path]];
        });
    }


    ///////////////////////////////////////////////
    public function images()
    {
        return $this->morphToMany(Image::class, 'imageables')->withPivot('detail');
    }
    ///////////////////////////////////////////////

}
