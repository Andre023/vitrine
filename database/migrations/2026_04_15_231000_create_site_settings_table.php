<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('nome_site')->default('Minha Vitrine de Ebooks');
            $table->string('hero_titulo')->nullable();
            $table->text('hero_subtitulo')->nullable();
            $table->string('hero_imagem')->nullable();
            $table->string('cor_primaria')->default('#7c3aed');
            $table->text('sobre_texto')->nullable();
            $table->string('rodape_texto')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
