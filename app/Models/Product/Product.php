<?php

namespace App\Models\Product;

use App\Models\Category;
use App\Models\Comment\Comment;
use App\Models\Image;
use App\Models\Membership;
use App\Models\Option;
use App\Models\Tag;
use App\Models\Thumbnail;
use Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function prices()
    {

        return  $this->belongsToMany(Membership::class)->withPivot('price');
    }

    public function buys()
    {
        return $this->hasMany(ProductBuy::class);
    }

    public function bought()
    {
        $option = Option::whereName('product_show_bought')->first();
        if ($option) {
            $option = ($option->value) ? true : false;
        } else {
            $option = true;
        }

        if ($option && auth()->user()) {
            $buys = $this->hasMany(ProductBuy::class);
            return !!$buys->whereUser_id(auth()->user()->id)->get()->count();
        }
        return false;
    }

    public function getCountAttribute($value)
    {
        $buys = $this->hasMany(ProductBuy::class);
        $leftover_count =  $value - $buys->get()->count();
        return [
            'count' => $value,
            'leftover_count' => $leftover_count,
        ];
    }

    public function getPricesAttribute()
    {
        $option = Option::orWhere('name', 'product_show_price_coming_soon')
            ->orWhere('name', 'product_show_price_cancel')
            ->get()->pluck('value', 'name')->all();

        if (!(array_key_exists('product_show_price_coming_soon', $option))) $option['product_show_price_coming_soon'] = true;
        if (!(array_key_exists('product_show_price_cancel', $option))) $option['product_show_price_cancel'] = true;

        if ($this->time['action'] === 'coming soon' && !$option['product_show_price_coming_soon']) {
            return false;
        } else if ($this->time['action'] === 'cancel' && !$option['product_show_price_cancel']) {
            return false;
        }
        return $this->belongsToMany(Membership::class)->withPivot('price')->get()->pluck('pivot.price', 'name')->all();
    }


    // public function images()
    // {
    //     return $this->belongsToMany(ProductImage::class);
    // }

    // public function thumbnail()
    // {
    //     return $this->belongsTo(ProductThumbnail::class);
    // }

    public function getImagesAttribute()
    {
        $pathImage = env('PATH_IMAGE_PRODUCT');
        $base_URL = env('APP_URL');

        return $this->images()->wherePivot('detail', 'product')->get()->map->only(['path', 'alt'])->map(function ($e) use ($base_URL, $pathImage) {
            $e['path'] = $base_URL . $pathImage . $e['path'];
            return $e;
        });
    }

    public function getTagsAttribute()
    {
        return $this->tags()->pluck('name')->all();
    }

    public function getCategoriesAttribute($value)
    {
        return $this->categories()->pluck('name')->all();
    }

    public function getThumbnailAttribute()
    {
        $image = $this->images()->wherePivot('detail', 'thumbnail')->first();

        $base_URL = env('APP_URL');
        $pathImage = env('PATH_IMAGE_PRODUCT');
        $pathImagedefault = env('DEFAULT_PATH_THUMBNAIL_PRODUCT');

        if ($image) {
            return ['path' => $base_URL . $pathImage . $image->path, 'alt' => $image->alt];
        } else {
            return ['path' => $base_URL . $pathImagedefault, 'alt' => ''];
        }
    }

    public function getTimeAttribute($value)
    {
        if ($this->times === null) {
            $time = json_decode($value);
            $time_start = $time->time_start;
            $time_end = $time->time_end;

            if (strtotime($time_start) > strtotime(now())) {
                $btn_buy = 'coming soon';
            } else if (strtotime($time_end) < strtotime(now()) || !$this->count['leftover_count']) {
                $btn_buy = 'cancel';
            } else {
                $btn_buy = 'buy';
            }
            
            $time = [
                'time_start' => $time_start,
                'time_end' => $time_end,
                'action' => $btn_buy
            ];
            $this->times = $time;
            return $time;
        }
        return $this->times;
    }

    ///////////////////////////////////////////////
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggables');
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categoryables');
    }

    public function images()
    {
        return $this->morphToMany(Image::class, 'imageables')->withPivot('detail');
    }
    ///////////////////////////////////////////////

}
