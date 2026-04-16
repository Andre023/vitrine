<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ebooks', function (Blueprint $table) {
            $table->string('preco')->nullable()->after('link_hotmart');
            $table->string('preco_original')->nullable()->after('preco');
            $table->string('categoria')->nullable()->after('preco_original');
            $table->string('badge_texto')->nullable()->after('categoria');
            $table->string('badge_cor')->default('#ef4444')->after('badge_texto');
            $table->string('botao_texto')->default('Quero este ebook')->after('badge_cor');
            $table->boolean('destaque')->default(false)->after('botao_texto');
            $table->integer('paginas')->nullable()->after('destaque');
        });

        Schema::table('site_settings', function (Blueprint $table) {
            // Identidade
            $table->string('logo')->nullable()->after('nome_site');
            $table->string('cor_secundaria')->default('#f59e0b')->after('cor_primaria');
            $table->string('fonte')->default('Inter')->after('cor_secundaria');

            // Hero
            $table->string('hero_badge_texto')->default('✦ Ebooks Digitais')->after('hero_imagem');
            $table->string('hero_cta_texto')->default('Ver todos os ebooks')->after('hero_badge_texto');
            $table->string('hero_cta_link')->default('#ebooks')->after('hero_cta_texto');

            // Seção ebooks
            $table->string('secao_ebooks_titulo')->default('Nossos Ebooks')->after('hero_cta_link');
            $table->string('secao_ebooks_subtitulo')->nullable()->after('secao_ebooks_titulo');

            // Stats
            $table->string('stat_1_numero')->nullable()->after('secao_ebooks_subtitulo');
            $table->string('stat_1_label')->nullable()->after('stat_1_numero');
            $table->string('stat_2_numero')->nullable()->after('stat_1_label');
            $table->string('stat_2_label')->nullable()->after('stat_2_numero');
            $table->string('stat_3_numero')->nullable()->after('stat_2_label');
            $table->string('stat_3_label')->nullable()->after('stat_3_numero');

            // Sobre
            $table->string('sobre_titulo')->nullable()->after('stat_3_label');
            $table->string('sobre_imagem')->nullable()->after('sobre_titulo');

            // Contato / Redes
            $table->string('whatsapp')->nullable()->after('sobre_imagem');
            $table->string('instagram')->nullable()->after('whatsapp');
            $table->string('facebook')->nullable()->after('instagram');
            $table->string('youtube')->nullable()->after('facebook');
            $table->string('email_contato')->nullable()->after('youtube');
        });
    }

    public function down(): void
    {
        Schema::table('ebooks', function (Blueprint $table) {
            $table->dropColumn(['preco','preco_original','categoria','badge_texto','badge_cor','botao_texto','destaque','paginas']);
        });
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn([
                'logo','cor_secundaria','fonte',
                'hero_badge_texto','hero_cta_texto','hero_cta_link',
                'secao_ebooks_titulo','secao_ebooks_subtitulo',
                'stat_1_numero','stat_1_label','stat_2_numero','stat_2_label','stat_3_numero','stat_3_label',
                'sobre_titulo','sobre_imagem',
                'whatsapp','instagram','facebook','youtube','email_contato',
            ]);
        });
    }
};
