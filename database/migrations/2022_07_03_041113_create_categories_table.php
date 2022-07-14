<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            // $table->integer('subset')->nullable();  // زیرمجموعه خود دسته بندی
            $table->string('name');                    // عنوان دسته بندی
        });

        Schema::create('categoryables', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id')->unsigned();
            $table->integer("categoryables_id");
            $table->string("categoryables_type");

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categoryable');
        Schema::dropIfExists('categories');
    }
}
