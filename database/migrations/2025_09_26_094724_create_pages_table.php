<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('ShortDescription')->nullable();
            $table->json('structure')->nullable();
            $table->foreignId('imagen_id')->nullable()->constrained('imagenes')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pages');
    }
};
