<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ebook extends Model
{
    protected $fillable = [
        'titulo',
        'descricao',
        'capa',
        'link_hotmart',
        'preco',
        'preco_original',
        'categoria',
        'badge_texto',
        'badge_cor',
        'botao_texto',
        'destaque',
        'paginas',
        'ordem',
        'ativo',
    ];

    protected $casts = [
        'ativo'     => 'boolean',
        'destaque'  => 'boolean',
        'ordem'     => 'integer',
        'paginas'   => 'integer',
    ];
}
