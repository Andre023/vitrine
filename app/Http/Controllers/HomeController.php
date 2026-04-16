<?php

namespace App\Http\Controllers;

use App\Models\Ebook;
use App\Models\SiteSettings;
use Illuminate\Routing\Controller;

class HomeController extends Controller
{
    public function index()
    {
        $settings = SiteSettings::get();

        $destaques = Ebook::where('ativo', true)
            ->where('destaque', true)
            ->orderBy('ordem')
            ->get();

        $ebooks = Ebook::where('ativo', true)
            ->orderBy('ordem')
            ->orderBy('created_at')
            ->get();

        return view('vitrine', compact('ebooks', 'destaques', 'settings'));
    }
}
