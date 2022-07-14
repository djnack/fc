<?php

use App\Http\Controllers\Product\WebProductRedirectController;
use Illuminate\Support\Facades\Route;


Route::get('/product/{id}/{slug?}',[WebProductRedirectController::class,'ProductID']);


Route::get('/{path?}/{path1?}/{path2?}/{path3?}/{path4?}/{path5?}/{path6?}', function () {
    return view('welcome');
});

// ->where('path', '([A-z\d\-\/_.]+)?')
