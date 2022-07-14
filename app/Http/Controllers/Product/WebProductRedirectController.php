<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product\Product;

class WebProductRedirectController extends Controller
{
    public function ProductID($id, $slug = null)
    {
        if (strval(intval($id)) === $id) {
            $product = Product::whereId($id)->where('publish',1)->first();
            if ($product) {
                if ($product->slug !== $slug) {
                    $route = '/product/' . $id . '/' . $product->slug;
                    return redirect($route);
                }
            }
        }
        return view('welcome');
    }
}
