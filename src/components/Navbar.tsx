'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Cursos', href: '#catalogo' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={scrolled ? { borderBottomColor: 'rgba(201,168,76,0.15)' } : {}}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 34, height: 34,
            background: 'linear-gradient(135deg, #e8c97e, #c9a84c)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#0d0d0d" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#0d0d0d" strokeWidth="2"/>
            </svg>
          </div>
          <span className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f0ede8', letterSpacing: '-0.01em' }}>
            Acervo
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.88rem',
                fontWeight: 400,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                borderRadius: 8,
                transition: 'color 0.2s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="#catalogo"
            style={{
              padding: '0.55rem 1.4rem',
              background: 'linear-gradient(135deg, #e8c97e, #c9a84c)',
              color: '#0d0d0d',
              borderRadius: 100,
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,168,76,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            className="hidden-mobile"
          >
            Ver Cursos
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text)' }}
            className="show-mobile"
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="8" x2="21" y2="8"/>
                  <line x1="3" y1="16" x2="21" y2="16"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(13,13,13,0.97)',
            zIndex: 99, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
            backdropFilter: 'blur(20px)',
          }}
        >
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display"
              style={{
                fontSize: '2rem', fontWeight: 700, color: 'var(--text)',
                textDecoration: 'none', letterSpacing: '-0.01em',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#catalogo"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '0.5rem', padding: '0.75rem 2.5rem',
              background: 'linear-gradient(135deg, #e8c97e, #c9a84c)',
              color: '#0d0d0d', borderRadius: 100, fontSize: '0.9rem',
              fontWeight: 600, textDecoration: 'none',
            }}
          >
            Ver Cursos
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 641px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
