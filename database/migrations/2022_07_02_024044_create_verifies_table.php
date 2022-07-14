<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVerifiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('verifies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('blood_type',3)->nullable(); // گروه خونی
            $table->text('disease')->nullable();        // بیماری خاص
            $table->text('medicine')->nullable();       // داروهای مصرفی
            $table->text('sensitivity')->nullable();    // حساسیت دارویی
            $table->timestamps();                       // تاریخ ایجاد و بروز رسانی
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('verifies');
    }
}
