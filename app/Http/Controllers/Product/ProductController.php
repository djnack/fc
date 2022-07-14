<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Other\ConvertNumberToEnglish;
use App\Models\Product\Product;
use App\Models\User;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function Product(Request $req)
    {
        $req->merge([
            'id' => ConvertNumberToEnglish::convert($req->id),
        ]);

        $this->validate($req, [
            'id' => 'required | integer',
        ]);

        $product = Product::whereId($req->id)->where('publish', 1)->first([
            'id',
            'title',
            'slug',
            'description',
            'count',
            'images',
            'text',
            'location',
            'time',
        ]);

        if ($product) {

            $data = [
                'id' => $product->id,
                'title' => $product->title,
                'slug' => $product->slug,
                'description' => $product->description,
                'count' => $product->count['leftover_count'],
                'text' => $product->text,
                'images' => $product->images,
                'location' => $product->location,
                'prices' => $product->prices,
                'categories' => $product->categories,
                'tags' => $product->tags,
                'bought' => $product->bought(),
                'btn_buy' => $product->time['action'],
            ];

            return response()->json([
                'status' => 200,
                'data' => $data,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'errors' => ['message' => 'Not find']
            ], 404);
        }
    }
}
