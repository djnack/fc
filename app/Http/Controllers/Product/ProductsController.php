<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Option;
use App\Models\Product\Product;

class ProductsController extends Controller
{
    public function Products()
    {

        $option = Option::whereName('paginate_products')
            ->orWhere('name', 'product_show_location_cart')
            ->get()->pluck('value', 'name')->all();

        if (!(array_key_exists('paginate_products', $option))) $option['paginate_products'] = false;
        if (!(array_key_exists('product_show_location_cart', $option))) $option['product_show_location_cart'] = true;

        // تعداد صفحه هات رو به ترتیب اول از دیتابیس میخونه.
        // برای جلوگیری از ارور ی دیفالت هم در انو ذخیره شده

        $paginate = ($option['paginate_products']) ? $option['paginate_products'] : env('DEFAULT_PAGINATE_PRODUCTS');

        $products = Product::wherePublish(1)->select(
            [
                'id',
                'user_id',
                'title',
                'description',
                'location',
                'text',
                'thumbnail',
                'time',
                // count اجباریه
                'count',
                'slug',
            ]
        )->latest('id')->paginate($paginate)->setPath(route('products'));

        $data = $products->map(function ($product) use ($option) {

            $location = $product->location;

            if (!$option['product_show_location_cart']) $location = false;

            return [
                'id' => $product->id,
                'title' => $product->title,
                'slug' => $product->slug,
                'description' => $product->description,
                'text' => $product->text,
                'location' => $location,
                'prices' => $product->prices,
                'thumbnail' => $product->thumbnail,
                'btn_buy' => $product->time['action'],
                'bought' => $product->bought(),
            ];
        });

        $page = [
            'perPage' => $products->perPage(),              // تعداد نمایش محصولات
            'currentPage' => $products->currentPage(),      // برگه کنونی
            'lastPage' => $products->lastPage(),            // آخرین برگه
            'total' => $products->total(),                  // تعداد کل محصولات];
        ];

        return response()->json([
            'status' => 200,
            'data' => $data,
            'paginate' => $page
        ], 200);
    }
}
