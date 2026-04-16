<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $settings->nome_site }}</title>
    <meta name="description" content="{{ $settings->hero_subtitulo }}">

    <!-- Fonts: DM Serif Display + DM Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">

    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif

    <style>
        /* ── TOKENS ──────────────────────────────────────────── */
        :root {
            --p:        {{ $settings->cor_primaria ?? '#1a1a2e' }};
            --p-dark:   color-mix(in srgb, var(--p) 75%, #000);
            --p-light:  color-mix(in srgb, var(--p) 12%, #fff);
            --s:        {{ $settings->cor_secundaria ?? '#e8a020' }};
            --ink:      #111118;
            --muted:    #6b6b80;
            --surface:  #f9f8fd;
            --card-bg:  #ffffff;
            --border:   #e8e6f0;
            --radius:   18px;
            --radius-sm:10px;
            --shadow:   0 2px 12px rgba(0,0,0,.07), 0 8px 32px rgba(0,0,0,.05);
            --shadow-lg:0 16px 56px rgba(0,0,0,.13);
            --trans:    .25s cubic-bezier(.4,0,.2,1);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
            font-family: 'DM Sans', sans-serif;
            background: var(--surface);
            color: var(--ink);
            -webkit-font-smoothing: antialiased;
        }

        img { display: block; max-width: 100%; }
        a   { color: inherit; text-decoration: none; }

        /* ── UTILITY ──────────────────────────────────────────── */
        .container {
            max-width: 1220px;
            margin: 0 auto;
            padding: 0 1.5rem;
        }

        /* ── HEADER ──────────────────────────────────────────── */
        .header {
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(255,255,255,.9);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--border);
        }
        .header-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 68px;
            gap: 1rem;
        }
        .header-logo {
            display: flex;
            align-items: center;
            gap: .6rem;
            font-family: 'DM Serif Display', serif;
            font-size: 1.35rem;
            color: var(--p);
            letter-spacing: -.01em;
            flex-shrink: 0;
        }
        .header-logo img {
            height: 36px;
            width: auto;
            border-radius: 6px;
        }
        .header-nav {
            display: flex;
            align-items: center;
            gap: 2rem;
            list-style: none;
        }
        .header-nav a {
            font-size: .9rem;
            font-weight: 500;
            color: var(--muted);
            transition: color var(--trans);
        }
        .header-nav a:hover { color: var(--p); }

        .header-socials {
            display: flex;
            align-items: center;
            gap: .75rem;
        }
        .header-socials a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 999px;
            background: var(--p-light);
            color: var(--p);
            transition: background var(--trans), transform var(--trans);
        }
        .header-socials a:hover {
            background: var(--p);
            color: #fff;
            transform: scale(1.1);
        }
        .header-socials svg { width: 16px; height: 16px; }

        @media (max-width: 768px) {
            .header-nav { display: none; }
        }

        /* ── HERO ─────────────────────────────────────────────── */
        .hero {
            position: relative;
            min-height: 520px;
            display: flex;
            align-items: center;
            overflow: hidden;
            padding: 5rem 1.5rem 4rem;
        }
        .hero-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, var(--p) 0%, var(--p-dark) 100%);
        }
        .hero-bg-img {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            opacity: .18;
            mix-blend-mode: luminosity;
        }
        /* decorative noise */
        .hero-bg::after {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            opacity: .04;
        }

        /* Decorative circle */
        .hero-circle {
            position: absolute;
            right: -120px;
            top: -120px;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: rgba(255,255,255,.05);
            pointer-events: none;
        }
        .hero-circle-2 {
            position: absolute;
            left: -60px;
            bottom: -80px;
            width: 320px;
            height: 320px;
            border-radius: 50%;
            background: rgba(255,255,255,.04);
            pointer-events: none;
        }

        .hero-content {
            position: relative;
            z-index: 2;
            max-width: 680px;
        }
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: .4rem;
            background: rgba(255,255,255,.15);
            border: 1px solid rgba(255,255,255,.25);
            color: rgba(255,255,255,.95);
            font-size: .75rem;
            font-weight: 600;
            letter-spacing: .1em;
            text-transform: uppercase;
            padding: .4rem 1rem;
            border-radius: 999px;
            margin-bottom: 1.5rem;
            backdrop-filter: blur(4px);
        }
        .hero h1 {
            font-family: 'DM Serif Display', serif;
            font-size: clamp(2.2rem, 5.5vw, 3.6rem);
            color: #fff;
            line-height: 1.1;
            letter-spacing: -.02em;
            margin-bottom: 1.25rem;
        }
        .hero h1 em {
            font-style: italic;
            color: var(--s);
        }
        .hero-sub {
            font-size: 1.1rem;
            color: rgba(255,255,255,.8);
            line-height: 1.75;
            max-width: 540px;
            margin-bottom: 2rem;
        }
        .hero-cta {
            display: inline-flex;
            align-items: center;
            gap: .5rem;
            background: var(--s);
            color: #fff;
            font-weight: 700;
            font-size: .95rem;
            padding: .85rem 1.75rem;
            border-radius: 999px;
            transition: opacity var(--trans), transform var(--trans);
            box-shadow: 0 4px 20px rgba(0,0,0,.2);
        }
        .hero-cta:hover { opacity: .88; transform: translateY(-2px); }
        .hero-cta svg { width: 18px; height: 18px; }

        .hero-scroll {
            position: absolute;
            bottom: 1.75rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: .4rem;
            color: rgba(255,255,255,.45);
            font-size: .7rem;
            letter-spacing: .08em;
            text-transform: uppercase;
            animation: scrollBounce 2s ease-in-out infinite;
        }
        .hero-scroll svg { width: 18px; height: 18px; }
        @keyframes scrollBounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50%       { transform: translateX(-50%) translateY(5px); }
        }

        /* ── STATS BAR ────────────────────────────────────────── */
        .stats-bar {
            background: var(--card-bg);
            border-bottom: 1px solid var(--border);
        }
        .stats-inner {
            display: flex;
            justify-content: center;
            gap: 0;
            padding: 0;
        }
        .stat-item {
            flex: 1;
            max-width: 260px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.75rem 1.5rem;
            border-right: 1px solid var(--border);
            text-align: center;
        }
        .stat-item:last-child { border-right: none; }
        .stat-num {
            font-family: 'DM Serif Display', serif;
            font-size: 2.25rem;
            color: var(--p);
            line-height: 1;
            margin-bottom: .25rem;
        }
        .stat-label {
            font-size: .8rem;
            color: var(--muted);
            font-weight: 500;
            letter-spacing: .02em;
        }

        /* ── SECTION TITLE ────────────────────────────────────── */
        .section-title {
            text-align: center;
            margin-bottom: 3rem;
        }
        .section-eyebrow {
            display: inline-block;
            font-size: .72rem;
            font-weight: 700;
            letter-spacing: .14em;
            text-transform: uppercase;
            color: var(--p);
            background: var(--p-light);
            padding: .3rem .85rem;
            border-radius: 999px;
            margin-bottom: .9rem;
        }
        .section-title h2 {
            font-family: 'DM Serif Display', serif;
            font-size: clamp(1.8rem, 3vw, 2.5rem);
            color: var(--ink);
            letter-spacing: -.02em;
            line-height: 1.2;
        }
        .section-title p {
            color: var(--muted);
            font-size: .95rem;
            margin-top: .5rem;
            line-height: 1.6;
        }
        .section-line {
            width: 48px;
            height: 3px;
            border-radius: 999px;
            background: var(--s);
            margin: .9rem auto 0;
        }

        /* ── CARROSSEL DE DESTAQUES ───────────────────────────── */
        .carousel-section {
            padding: 4rem 0 3rem;
            background: var(--ink);
            overflow: hidden;
        }
        .carousel-section .section-title h2 { color: #fff; }
        .carousel-section .section-title p  { color: rgba(255,255,255,.55); }
        .carousel-section .section-eyebrow {
            background: rgba(255,255,255,.1);
            color: rgba(255,255,255,.8);
        }

        .swiper { overflow: visible !important; }
        .swiper-wrapper { padding-bottom: .5rem; }

        .carousel-outer {
            max-width: 1220px;
            margin: 0 auto;
            padding: 0 1.5rem;
            position: relative;
        }

        .swiper-slide { width: 340px; }

        .dest-card {
            position: relative;
            border-radius: var(--radius);
            overflow: hidden;
            background: var(--card-bg);
            box-shadow: var(--shadow-lg);
            display: flex;
            flex-direction: column;
            height: 100%;
            transition: transform var(--trans);
        }
        .dest-card:hover { transform: translateY(-5px); }

        .dest-cover {
            position: relative;
            aspect-ratio: 3/4;
            overflow: hidden;
            background: var(--p-light);
            max-height: 280px;
        }
        .dest-cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform .5s ease;
        }
        .dest-card:hover .dest-cover img { transform: scale(1.06); }
        .dest-cover-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--p-light), color-mix(in srgb, var(--p) 25%, #fff));
        }
        .dest-cover-placeholder svg { width: 56px; height: 56px; opacity: .35; color: var(--p); }

        .dest-badge-wrap {
            position: absolute;
            top: .85rem;
            left: .85rem;
            display: flex;
            flex-wrap: wrap;
            gap: .4rem;
        }
        .badge {
            font-size: .68rem;
            font-weight: 700;
            letter-spacing: .04em;
            text-transform: uppercase;
            padding: .3rem .65rem;
            border-radius: 999px;
            color: #fff;
            line-height: 1;
        }
        .badge-destaque {
            background: var(--s);
        }

        .dest-body {
            padding: 1.25rem 1.25rem 1.4rem;
            display: flex;
            flex-direction: column;
            flex: 1;
        }

        @if(false) /* meta — não renderiza */ @endif

        .card-cat {
            font-size: .7rem;
            font-weight: 600;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: var(--muted);
            margin-bottom: .4rem;
        }
        .card-title {
            font-family: 'DM Serif Display', serif;
            font-size: 1.15rem;
            color: var(--ink);
            line-height: 1.3;
            margin-bottom: .5rem;
        }
        .card-desc {
            font-size: .83rem;
            color: var(--muted);
            line-height: 1.65;
            flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .card-meta {
            display: flex;
            align-items: center;
            gap: .8rem;
            margin: .85rem 0;
            flex-wrap: wrap;
        }
        .card-meta-item {
            display: flex;
            align-items: center;
            gap: .3rem;
            font-size: .75rem;
            color: var(--muted);
        }
        .card-meta-item svg { width: 13px; height: 13px; flex-shrink: 0; }

        .card-price-row {
            display: flex;
            align-items: baseline;
            gap: .5rem;
            margin-bottom: 1rem;
        }
        .card-price {
            font-family: 'DM Serif Display', serif;
            font-size: 1.4rem;
            color: var(--p);
        }
        .card-price-orig {
            font-size: .85rem;
            color: var(--muted);
            text-decoration: line-through;
        }
        .card-discount {
            font-size: .7rem;
            font-weight: 700;
            color: #16a34a;
            background: #dcfce7;
            padding: .15rem .45rem;
            border-radius: 999px;
        }

        .card-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: .45rem;
            background: var(--p);
            color: #fff;
            font-weight: 700;
            font-size: .875rem;
            padding: .8rem 1rem;
            border-radius: var(--radius-sm);
            transition: background var(--trans), transform var(--trans);
            text-align: center;
        }
        .card-btn:hover { background: var(--p-dark); transform: scale(1.02); }
        .card-btn svg { width: 15px; height: 15px; }

        /* Swiper nav */
        .swiper-button-next,
        .swiper-button-prev {
            width: 44px !important;
            height: 44px !important;
            background: white;
            border-radius: 50%;
            box-shadow: var(--shadow);
            color: var(--p) !important;
            top: 50% !important;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
            font-size: .9rem !important;
            font-weight: 900;
        }
        .swiper-pagination-bullet-active {
            background: var(--s) !important;
        }

        /* ── EBOOKS GRID ──────────────────────────────────────── */
        .ebooks-section {
            padding: 5rem 0;
        }
        .ebooks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
            gap: 1.75rem;
        }

        /* Grid card - inherits dest-card styles */
        .ebook-card {
            background: var(--card-bg);
            border-radius: var(--radius);
            overflow: hidden;
            box-shadow: var(--shadow);
            border: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            transition: transform var(--trans), box-shadow var(--trans);
        }
        .ebook-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
        }
        .ebook-cover {
            position: relative;
            aspect-ratio: 3/4;
            overflow: hidden;
            background: var(--p-light);
            max-height: 320px;
        }
        .ebook-cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform .5s ease;
        }
        .ebook-card:hover .ebook-cover img { transform: scale(1.05); }
        .ebook-cover-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--p-light), color-mix(in srgb, var(--p) 25%, #fff));
        }
        .ebook-cover-placeholder svg { width: 60px; height: 60px; opacity: .3; color: var(--p); }
        .ebook-body { padding: 1.25rem 1.25rem 1.4rem; display: flex; flex-direction: column; flex: 1; }

        /* ── EMPTY ────────────────────────────────────────────── */
        .empty-state {
            grid-column: 1 / -1;
            text-align: center;
            padding: 5rem 2rem;
            color: var(--muted);
        }
        .empty-state svg { width: 72px; height: 72px; margin: 0 auto 1rem; opacity: .3; }
        .empty-state h3 { font-size: 1.25rem; font-weight: 600; }
        .empty-state p  { font-size: .9rem; margin-top: .3rem; }

        /* ── SOBRE ────────────────────────────────────────────── */
        .sobre-section {
            padding: 5rem 0;
            background: var(--card-bg);
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
        }
        .sobre-inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }
        @media (max-width: 768px) {
            .sobre-inner { grid-template-columns: 1fr; gap: 2.5rem; }
            .sobre-img-wrap { order: -1; }
        }
        .sobre-img-wrap {
            position: relative;
        }
        .sobre-img-wrap img {
            width: 100%;
            border-radius: 20px;
            object-fit: cover;
            aspect-ratio: 4/5;
            box-shadow: var(--shadow-lg);
        }
        .sobre-img-placeholder {
            width: 100%;
            aspect-ratio: 4/5;
            border-radius: 20px;
            background: linear-gradient(135deg, var(--p-light), color-mix(in srgb, var(--p) 30%, #fff));
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .sobre-img-placeholder svg { width: 80px; height: 80px; opacity: .3; color: var(--p); }
        /* decorative blob behind image */
        .sobre-img-wrap::before {
            content: '';
            position: absolute;
            inset: -16px;
            border-radius: 28px;
            background: var(--p-light);
            z-index: -1;
        }
        .sobre-text {}
        .sobre-text h2 {
            font-family: 'DM Serif Display', serif;
            font-size: clamp(1.8rem, 3vw, 2.4rem);
            line-height: 1.2;
            letter-spacing: -.02em;
            margin-bottom: 1.25rem;
        }
        .sobre-text p {
            font-size: .975rem;
            color: #4b4b60;
            line-height: 1.85;
            margin-bottom: 1rem;
        }
        .sobre-socials {
            display: flex;
            gap: .75rem;
            margin-top: 1.5rem;
            flex-wrap: wrap;
        }
        .sobre-social-link {
            display: inline-flex;
            align-items: center;
            gap: .5rem;
            background: var(--p-light);
            color: var(--p);
            font-size: .82rem;
            font-weight: 600;
            padding: .55rem 1rem;
            border-radius: 999px;
            transition: background var(--trans), color var(--trans), transform var(--trans);
        }
        .sobre-social-link:hover {
            background: var(--p);
            color: #fff;
            transform: translateY(-2px);
        }
        .sobre-social-link svg { width: 15px; height: 15px; }

        /* ── FOOTER ───────────────────────────────────────────── */
        .footer {
            background: var(--ink);
            padding: 3rem 1.5rem;
        }
        .footer-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.5rem;
            flex-wrap: wrap;
        }
        .footer-brand {
            font-family: 'DM Serif Display', serif;
            font-size: 1.2rem;
            color: #fff;
        }
        .footer-copy {
            font-size: .8rem;
            color: rgba(255,255,255,.4);
            text-align: center;
        }
        .footer-socials {
            display: flex;
            gap: .6rem;
        }
        .footer-socials a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255,255,255,.08);
            color: rgba(255,255,255,.65);
            transition: background var(--trans), color var(--trans);
        }
        .footer-socials a:hover { background: var(--p); color: #fff; }
        .footer-socials svg { width: 15px; height: 15px; }

        /* ── SCROLL REVEAL ────────────────────────────────────── */
        .reveal {
            opacity: 0;
            transform: translateY(22px);
            transition: opacity .55s ease, transform .55s ease;
        }
        .reveal.visible {
            opacity: 1;
            transform: none;
        }

        /* ── MOBILE ───────────────────────────────────────────── */
        @media (max-width: 640px) {
            .stats-inner { flex-wrap: wrap; }
            .stat-item { flex: 0 0 50%; border-bottom: 1px solid var(--border); }
            .stat-item:nth-child(2n) { border-right: none; }
        }
    </style>
</head>
<body>

{{-- ── HEADER ──────────────────────────────────────────────── --}}
<header class="header">
    <div class="container">
        <div class="header-inner">

            {{-- Logo / Nome --}}
            <a href="/" class="header-logo">
                @if ($settings->logo)
                    <img src="{{ Storage::url($settings->logo) }}" alt="{{ $settings->nome_site }}">
                @else
                    {{ $settings->nome_site }}
                @endif
            </a>

            {{-- Navegação --}}
            <nav>
                <ul class="header-nav">
                    @if ($destaques->isNotEmpty())
                        <li><a href="#destaques">Destaques</a></li>
                    @endif
                    <li><a href="#ebooks">Ebooks</a></li>
                    @if ($settings->sobre_texto)
                        <li><a href="#sobre">Sobre</a></li>
                    @endif
                    @if ($settings->whatsapp || $settings->email_contato)
                        <li><a href="#contato">Contato</a></li>
                    @endif
                </ul>
            </nav>

            {{-- Redes sociais no header --}}
            <div class="header-socials">
                @if ($settings->instagram)
                    <a href="{{ $settings->instagram }}" target="_blank" rel="noopener" title="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                    </a>
                @endif
                @if ($settings->whatsapp)
                    <a href="{{ $settings->whatsapp }}" target="_blank" rel="noopener" title="WhatsApp">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                        </svg>
                    </a>
                @endif
            </div>

        </div>
    </div>
</header>

{{-- ── HERO ─────────────────────────────────────────────────── --}}
<section class="hero">
    <div class="hero-bg"></div>
    @if ($settings->hero_imagem)
        <div class="hero-bg-img" style="background-image: url('{{ Storage::url($settings->hero_imagem) }}')"></div>
    @endif
    <div class="hero-circle"></div>
    <div class="hero-circle-2"></div>

    <div class="hero-content container">
        @if ($settings->hero_badge_texto)
            <div class="hero-badge">{{ $settings->hero_badge_texto }}</div>
        @endif
        <h1>{!! nl2br(e($settings->hero_titulo)) !!}</h1>
        @if ($settings->hero_subtitulo)
            <p class="hero-sub">{{ $settings->hero_subtitulo }}</p>
        @endif
        @if ($settings->hero_cta_texto)
            <a href="{{ $settings->hero_cta_link ?? '#ebooks' }}" class="hero-cta">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
                {{ $settings->hero_cta_texto }}
            </a>
        @endif
    </div>

    <div class="hero-scroll">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
    </div>
</section>

{{-- ── STATS BAR ─────────────────────────────────────────────── --}}
@if ($settings->stat_1_numero || $settings->stat_2_numero || $settings->stat_3_numero)
    <div class="stats-bar">
        <div class="container">
            <div class="stats-inner">
                @if ($settings->stat_1_numero)
                    <div class="stat-item">
                        <span class="stat-num">{{ $settings->stat_1_numero }}</span>
                        <span class="stat-label">{{ $settings->stat_1_label }}</span>
                    </div>
                @endif
                @if ($settings->stat_2_numero)
                    <div class="stat-item">
                        <span class="stat-num">{{ $settings->stat_2_numero }}</span>
                        <span class="stat-label">{{ $settings->stat_2_label }}</span>
                    </div>
                @endif
                @if ($settings->stat_3_numero)
                    <div class="stat-item">
                        <span class="stat-num">{{ $settings->stat_3_numero }}</span>
                        <span class="stat-label">{{ $settings->stat_3_label }}</span>
                    </div>
                @endif
            </div>
        </div>
    </div>
@endif

{{-- ── CARROSSEL DE DESTAQUES ───────────────────────────────── --}}
@if ($destaques->isNotEmpty())
<section class="carousel-section" id="destaques">
    <div class="carousel-outer">
        <div class="section-title reveal">
            <span class="section-eyebrow">⭐ Em Destaque</span>
            <h2>Escolhas da Editora</h2>
            <p>Os títulos mais procurados pelos nossos leitores</p>
        </div>

        <div class="swiper destSwiper">
            <div class="swiper-wrapper">
                @foreach ($destaques as $ebook)
                    <div class="swiper-slide">
                        <div class="dest-card">
                            <div class="dest-cover">
                                @if ($ebook->capa)
                                    <img src="{{ Storage::url($ebook->capa) }}" alt="{{ $ebook->titulo }}" loading="lazy">
                                @else
                                    <div class="dest-cover-placeholder">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                        </svg>
                                    </div>
                                @endif

                                <div class="dest-badge-wrap">
                                    <span class="badge badge-destaque">★ Destaque</span>
                                    @if ($ebook->badge_texto)
                                        <span class="badge" style="background: {{ $ebook->badge_cor ?? '#ef4444' }}">{{ $ebook->badge_texto }}</span>
                                    @endif
                                </div>
                            </div>

                            <div class="dest-body">
                                @if ($ebook->categoria)
                                    <p class="card-cat">{{ $ebook->categoria }}</p>
                                @endif

                                <h3 class="card-title">{{ $ebook->titulo }}</h3>

                                @if ($ebook->descricao)
                                    <p class="card-desc">{{ $ebook->descricao }}</p>
                                @endif

                                @if ($ebook->paginas)
                                    <div class="card-meta">
                                        <span class="card-meta-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            {{ $ebook->paginas }} páginas
                                        </span>
                                    </div>
                                @endif

                                @if ($ebook->preco)
                                    <div class="card-price-row">
                                        <span class="card-price">{{ $ebook->preco }}</span>
                                        @if ($ebook->preco_original)
                                            <span class="card-price-orig">{{ $ebook->preco_original }}</span>
                                            <span class="card-discount">Promoção</span>
                                        @endif
                                    </div>
                                @endif

                                <a href="{{ $ebook->link_hotmart }}" target="_blank" rel="noopener noreferrer" class="card-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                    {{ $ebook->botao_texto ?? 'Quero este ebook' }}
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination" style="position:static; margin-top:1.5rem;"></div>
        </div>
    </div>
</section>
@endif

{{-- ── TODOS OS EBOOKS ──────────────────────────────────────── --}}
<main>
    <section class="ebooks-section" id="ebooks">
        <div class="container">
            <div class="section-title reveal">
                <span class="section-eyebrow">📚 Catálogo</span>
                <h2>{{ $settings->secao_ebooks_titulo ?? 'Nossos Ebooks' }}</h2>
                @if ($settings->secao_ebooks_subtitulo)
                    <p>{{ $settings->secao_ebooks_subtitulo }}</p>
                @endif
                <div class="section-line"></div>
            </div>

            @if ($ebooks->isEmpty())
                <div class="ebooks-grid">
                    <div class="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                        <h3>Nenhum ebook disponível ainda</h3>
                        <p>Em breve novidades por aqui!</p>
                    </div>
                </div>
            @else
                <div class="ebooks-grid">
                    @foreach ($ebooks as $ebook)
                        <article class="ebook-card reveal">
                            <div class="ebook-cover">
                                @if ($ebook->capa)
                                    <img src="{{ Storage::url($ebook->capa) }}" alt="{{ $ebook->titulo }}" loading="lazy">
                                @else
                                    <div class="ebook-cover-placeholder">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                        </svg>
                                    </div>
                                @endif

                                @if ($ebook->badge_texto)
                                    <div class="dest-badge-wrap">
                                        <span class="badge" style="background: {{ $ebook->badge_cor ?? '#ef4444' }}">{{ $ebook->badge_texto }}</span>
                                    </div>
                                @endif
                            </div>

                            <div class="ebook-body">
                                @if ($ebook->categoria)
                                    <p class="card-cat">{{ $ebook->categoria }}</p>
                                @endif

                                <h3 class="card-title">{{ $ebook->titulo }}</h3>

                                @if ($ebook->descricao)
                                    <p class="card-desc">{{ $ebook->descricao }}</p>
                                @endif

                                <div class="card-meta">
                                    @if ($ebook->paginas)
                                        <span class="card-meta-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            {{ $ebook->paginas }} pág.
                                        </span>
                                    @endif
                                    @if ($ebook->categoria)
                                        <span class="card-meta-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                            </svg>
                                            {{ $ebook->categoria }}
                                        </span>
                                    @endif
                                </div>

                                @if ($ebook->preco)
                                    <div class="card-price-row">
                                        <span class="card-price">{{ $ebook->preco }}</span>
                                        @if ($ebook->preco_original)
                                            <span class="card-price-orig">{{ $ebook->preco_original }}</span>
                                            <span class="card-discount">Promoção</span>
                                        @endif
                                    </div>
                                @endif

                                <a href="{{ $ebook->link_hotmart }}" target="_blank" rel="noopener noreferrer" class="card-btn" style="margin-top: auto; padding-top: 1rem;">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                    {{ $ebook->botao_texto ?? 'Quero este ebook' }}
                                </a>
                            </div>
                        </article>
                    @endforeach
                </div>
            @endif
        </div>
    </section>
</main>

{{-- ── SOBRE ────────────────────────────────────────────────── --}}
@if ($settings->sobre_texto || $settings->sobre_titulo)
<section class="sobre-section" id="sobre">
    <div class="container">
        <div class="sobre-inner">
            <div class="sobre-img-wrap reveal">
                @if ($settings->sobre_imagem)
                    <img src="{{ Storage::url($settings->sobre_imagem) }}" alt="{{ $settings->sobre_titulo ?? 'Sobre' }}">
                @else
                    <div class="sobre-img-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </div>
                @endif
            </div>

            <div class="sobre-text reveal">
                <span class="section-eyebrow">👤 Quem sou eu</span>
                @if ($settings->sobre_titulo)
                    <h2>{{ $settings->sobre_titulo }}</h2>
                @endif
                @if ($settings->sobre_texto)
                    @foreach (explode("\n", $settings->sobre_texto) as $paragrafo)
                        @if (trim($paragrafo))
                            <p>{{ trim($paragrafo) }}</p>
                        @endif
                    @endforeach
                @endif

                {{-- Redes sociais --}}
                <div class="sobre-socials">
                    @if ($settings->instagram)
                        <a href="{{ $settings->instagram }}" target="_blank" rel="noopener" class="sobre-social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                            </svg>
                            Instagram
                        </a>
                    @endif
                    @if ($settings->youtube)
                        <a href="{{ $settings->youtube }}" target="_blank" rel="noopener" class="sobre-social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            YouTube
                        </a>
                    @endif
                    @if ($settings->facebook)
                        <a href="{{ $settings->facebook }}" target="_blank" rel="noopener" class="sobre-social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                        </a>
                    @endif
                    @if ($settings->whatsapp)
                        <a href="{{ $settings->whatsapp }}" target="_blank" rel="noopener" class="sobre-social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                            </svg>
                            WhatsApp
                        </a>
                    @endif
                    @if ($settings->email_contato)
                        <a href="mailto:{{ $settings->email_contato }}" class="sobre-social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            {{ $settings->email_contato }}
                        </a>
                    @endif
                </div>
            </div>
        </div>
    </div>
</section>
@endif

{{-- ── FOOTER ───────────────────────────────────────────────── --}}
<footer class="footer" id="contato">
    <div class="footer-inner container">
        <div class="footer-brand">{{ $settings->nome_site }}</div>

        <p class="footer-copy">
            {{ $settings->rodape_texto ?? '© ' . date('Y') . ' Todos os direitos reservados.' }}
        </p>

        <div class="footer-socials">
            @if ($settings->instagram)
                <a href="{{ $settings->instagram }}" target="_blank" rel="noopener" title="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                </a>
            @endif
            @if ($settings->youtube)
                <a href="{{ $settings->youtube }}" target="_blank" rel="noopener" title="YouTube">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                </a>
            @endif
            @if ($settings->facebook)
                <a href="{{ $settings->facebook }}" target="_blank" rel="noopener" title="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                </a>
            @endif
            @if ($settings->whatsapp)
                <a href="{{ $settings->whatsapp }}" target="_blank" rel="noopener" title="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                </a>
            @endif
            @if ($settings->email_contato)
                <a href="mailto:{{ $settings->email_contato }}" title="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                </a>
            @endif
        </div>
    </div>
</footer>

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>
    // Carrossel de Destaques
    new Swiper('.destSwiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        grabCursor: true,
        centeredSlides: false,
        loop: {{ $destaques->count() > 3 ? 'true' : 'false' }},
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640:  { slidesPerView: 2, spaceBetween: 20 },
            900:  { slidesPerView: 3, spaceBetween: 24 },
            1200: { slidesPerView: 4, spaceBetween: 28 },
        },
    });

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                e.target.style.transitionDelay = (i * 0.07) + 's';
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>
</body>
</html>
