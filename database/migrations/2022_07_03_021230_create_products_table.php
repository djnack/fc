<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');                  // چه کسی ثبت کرده
            $table->string('title')->nullable();                    // عنوان محصول
            $table->string('slug')->nullable()->unique();           // نوشته منحصر به فرد برای یو آر ال
            $table->string('description')->nullable();              // توضیحات
            $table->text('text')->nullable();                       // متن
            $table->string('location')->nullable();                 // مکان برنامه
            $table->tinyInteger('count')->nullable();               // تعداد بلیط
            $table->json('time')->nullable();                       // تایم شروع خرید & پایان خرید خرید
            // $table->integer('short_link')->nullable()->unique();    // لینک کوتاه برای اشتراک
            $table->boolean('thumbnail')->nullable();               // هیچ چیزی داخلش قرار نمیگیره فقط کمک کنندست
            $table->boolean('images')->nullable();                  // هیچ چیزی داخلش قرار نمیگیره فقط کمک کنندست
            $table->boolean('categories')->nullable();              // هیچ چیزی داخلش قرار نمیگیره فقط کمک کنندست
            $table->boolean('tags')->nullable();                    // هیچ چیزی داخلش قرار نمیگیره فقط کمک کنندست
            $table->boolean('prices')->nullable();                  // هیچ چیزی داخلش قرار نمیگیره فقط کمک کنندست
            $table->boolean('publish')->default(1);                 // قابل منتشر شدن یا نشدن
            $table->timestamps();                                   // تاریخ ایجاد و بروز رسانی

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('membership_product', function (Blueprint $table) {
            $table->unsignedBigInteger('product_id')->unsigned();
            $table->unsignedBigInteger('membership_id')->unsigned();
            $table->integer('price')->unsigned();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('membership_id')->references('id')->on('memberships')->onDelete('cascade');
        });

        Schema::create('product_buys', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unsigned();                          // ایدی خریدار
            $table->unsignedBigInteger('product_id')->unsigned();                       // ای محصول
            $table->unsignedBigInteger('other_user_id')->unsigned()->nullable();        // خرید توسط کسی دیگر
            $table->string('level_membership')->nullable();                             // لول اشتراک
            $table->integer('price');                                                   // قیمت خریده شده
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('other_user_id')->references('id')->on('users')->onDelete('cascade');
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_buys');
        Schema::dropIfExists('membership_product');
        Schema::dropIfExists('products');
    }
}
