<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name')->nullable();               // نام
            $table->string('last_name')->nullable();                // نام خانوادگی
            $table->string('nick_name')->nullable()->unique();      // نام مستعار
            $table->string('email')->unique()->nullable();          // استفاده نشده
            $table->string('phone',11)->unique();                   // شماره موبایل
            $table->string('id_cart',10)->unique()->nullable();     // کد ملی
            $table->string('id_passport',10)->nullable();           // شماره شناسنامه
            $table->string('parent_name')->nullable();              // نام پدر
            $table->timestamp('birth_day')->nullable();             // تاریخ تولد
            $table->boolean('sex')->nullable();                     // جنسیت
            $table->boolean('is_verify')->nullable();               // فعال بودن احراز هویت
            $table->boolean('level_verify')->default(1);            // سطح احراز هویت
            $table->boolean('active_otp')->nullable();              // فعال بودن شماره
            $table->timestamp('email_verified_at')->nullable();     // استفاده نشده
            $table->string('password')->nullable();                 // گذرواژه
            $table->boolean('memberships_level')->nullable();       // سطح عضویت
            $table->boolean('is_block')->nullable();                // مسدود سازی حساب
            $table->rememberToken();                                // استفاده نشده
            $table->boolean('images')->nullable();                  // هیچ چیزی داخلش قرار نمیگیره فقط کمک کنندست
            $table->timestamps();                                   // تاریخ ایجاد و بروز رسانی
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
