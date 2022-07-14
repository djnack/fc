<?php

namespace App\Http\Controllers\Comments;

use App\Http\Controllers\Controller;
use App\Models\Option;
use App\Models\Product\Product;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function comments(Request $req)
    {
        $this->validate($req, [
            'product' => 'numeric',
            'post' => 'numeric',
        ]);

        $option = Option::whereName('paginate_product_comments')->get()->pluck('value', 'name')->all();

        if (!(array_key_exists('paginate_product_comments', $option))) $option['paginate_product_comments'] = false;

        $paginate = ($option['paginate_product_comments']) ? $option['paginate_product_comments'] : env('DEFAULT_PAGINATE_PRODUCTS_COMMENTS');

        if ($req->product) {

            $product = Product::whereId($req->product)->first();
            $count = $product->comments()->wherePublish(1)->select('id')->count();

            $data['count'] = $count;
            $page = '';

            if ($count) {
                $comments = $product
                    ->comments()
                    ->latest('id')
                    ->wherePublish(1)
                    ->whereSubset(0)
                    // commentable_id commentable_type اجباری نباید حذف بشه
                    ->select([
                        'user_id', 'id', 'body', 'commentable_id',
                        'commentable_type', 'created_at', 'subset'
                    ])
                    ->paginate($paginate)
                    ->setPath(route('comments'));

                $page = [
                    'perPage' => $comments->perPage(),              // تعداد نمایش محصولات
                    'currentPage' => $comments->currentPage(),      // برگه کنونی
                    'lastPage' => $comments->lastPage(),            // آخرین برگه
                    'total' => $comments->total(),                  // تعداد کل محصولات];
                ];

                $data['comments'] = $comments->mapWithKeys(function ($comment, $key) use ($page) {
                    $indexPage = $page['perPage'] * $page['currentPage'] + $key + 1 - $page['perPage'];
                    return [$indexPage => [
                        'id' => $comment->id,
                        'user' => $comment->user_id,
                        'body' => $comment->body,
                        'subset' => $comment->subset,
                        'created_at' => $comment->created_at->diffForHumans(),
                    ]];
                });
            }
            return response()->json([
                'status' => 200,
                'data' => $data,
                'paginate' => $page
            ], 200);
        } else if ($req->post) {
            dd($req->post);
        } else {
            return response()->json([
                'status' => 404,
                'errors' => ['message' => 'Not find']
            ], 404);
        }
    }
}
