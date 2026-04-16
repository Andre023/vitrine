<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSettings extends Model
{
    protected $table = 'site_settings';

    protected $fillable = [
        'nome_site', 'logo',
        'cor_primaria', 'cor_secundaria', 'fonte',
        'hero_titulo', 'hero_subtitulo', 'hero_imagem',
        'hero_badge_texto', 'hero_cta_texto', 'hero_cta_link',
        'secao_ebooks_titulo', 'secao_ebooks_subtitulo',
        'stat_1_numero', 'stat_1_label',
        'stat_2_numero', 'stat_2_label',
        'stat_3_numero', 'stat_3_label',
        'sobre_titulo', 'sobre_texto', 'sobre_imagem',
        'whatsapp', 'instagram', 'facebook', 'youtube', 'email_contato',
        'rodape_texto',
    ];

    public static function get(): self
    {
        return static::firstOrCreate(
            ['id' => 1],
            [
                'nome_site'               => 'Minha Vitrine de Ebooks',
                'cor_primaria'            => '#7c3aed',
                'cor_secundaria'          => '#f59e0b',
                'fonte'                   => 'Inter',
                'hero_titulo'             => 'Transforme sua vida com nossos ebooks',
                'hero_subtitulo'          => 'Conteúdo de qualidade para o seu crescimento pessoal e profissional.',
                'hero_badge_texto'        => '✦ Ebooks Digitais',
                'hero_cta_texto'          => 'Ver todos os ebooks',
                'hero_cta_link'           => '#ebooks',
                'secao_ebooks_titulo'     => 'Nossos Ebooks',
                'secao_ebooks_subtitulo'  => 'Escolha o seu e comece hoje mesmo',
                'rodape_texto'            => '© ' . date('Y') . ' Todos os direitos reservados.',
            ]
        );
    }
}
