<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\OTPController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResendOTPController;
use App\Http\Controllers\Auth\ResetPaswwordController;
use App\Http\Controllers\Comments\CommentsController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\ProductsController;
use App\Http\Controllers\Verify\VerifyController;
use Illuminate\Support\Facades\Route;


//اگه توکن ارسال بشه باید فعال بشه تا بصورت گلوبال بشه از auth()->user() استفاده کرد



Route::post('/login', [LoginController::class, 'Login'])->name('login');
Route::post('/register', [RegisterController::class, 'Register'])->name('register');
Route::post('/otp', [OTPController::class, 'OTP'])->name('otp');
Route::post('/resend_otp', [ResendOTPController::class, 'ResendOTP'])->name('resend_otp');

Route::middleware(['active.token'])->group(function () {
    Route::post('/products', [ProductsController::class, 'Products'])->name('products');
    Route::post('/product', [ProductController::class, 'Product'])->name('product');
    
    Route::post('/comments', [CommentsController::class, 'comments'])->name('comments');
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/reset_password', [ResetPaswwordController::class, 'ResetPassword'])->name('reset_password');
    Route::post('/logout', [LogoutController::class, 'Logout'])->name('ogout');
    Route::post('/verify_personal', [VerifyController::class, 'VerifyPersonal'])->name('verify_personal');
    Route::post('/verify_insurance', [VerifyController::class, 'VerifyInsurance'])->name('verify_insurance');
    Route::post('/verify_physical', [VerifyController::class, 'VerifyPhysical'])->name('verify_physical');
});
