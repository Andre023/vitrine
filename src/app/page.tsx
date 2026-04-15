import { supabase } from '../lib/supabase';
import EbookCard from '../components/EbookCard';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default async function Home({ searchParams }: { searchParams: { categoria?: string } }) {
  const categoriaAtiva = searchParams.categoria || 'todos';

  const { data: categorias } = await supabase
    .from('categorias')
    .select('*')
    .order('ordem', { ascending: true });

  const { data: ebooks, error } = await supabase
    .from('ebooks')
    .select('*')
    .eq('visivel', true)
    .order('created_at', { ascending: false });

  if (error) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: '#e04040' }}>Erro: {error.message}</div>;
  }

  const ebooksFiltrados = categoriaAtiva === 'todos'
    ? ebooks
    : ebooks?.filter((ebook) => {
        const categoriaDoEbook = categorias?.find(c => c.id === ebook.categoria_id);
        return categoriaDoEbook?.slug === categoriaAtiva;
      });

  const stats = [
    { value: `${ebooks?.length || 0}+`, label: 'Títulos no acervo' },
    { value: categorias?.length || 0, label: 'Categorias' },
    { value: '4.9★', label: 'Avaliação média' },
  ];

  return (
    <>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section id="inicio" className="hero-section">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

          <div className="section-label animate-fade-up" style={{ justifyContent: 'center' }}>
            Curadoria de ebooks
          </div>

          <h1 className="font-display animate-fade-up delay-1" style={{
            fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
            fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em',
            marginBottom: '1.5rem', color: 'var(--text)',
          }}>
            O conhecimento certo,{' '}
            <span className="text-gold" style={{ fontStyle: 'italic' }}>no momento certo.</span>
          </h1>

          <p className="animate-fade-up delay-2" style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--text-muted)', lineHeight: 1.75,
            maxWidth: 560, margin: '0 auto 2.5rem',
            fontWeight: 300,
          }}>
            Uma seleção criteriosa de ebooks para quem quer crescer com intenção. 
            Conhecimento denso, linguagem acessível.
          </p>

          <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#catalogo" style={{
              padding: '0.85rem 2.2rem',
              background: 'linear-gradient(135deg, #e8c97e, #c9a84c)',
              color: '#0d0d0d', borderRadius: 100, fontWeight: 600,
              fontSize: '0.9rem', letterSpacing: '0.05em',
              textDecoration: 'none', transition: 'all 0.3s ease',
            }}
              onMouseEnter={undefined}
            >
              Explorar Acervo
            </a>
            <a href="#sobre" style={{
              padding: '0.85rem 2.2rem',
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              borderRadius: 100, fontWeight: 500,
              fontSize: '0.9rem', letterSpacing: '0.02em',
              textDecoration: 'none', transition: 'all 0.3s ease',
            }}>
              Sobre nós
            </a>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up delay-4" style={{
            display: 'flex', gap: '1.5rem', justifyContent: 'center',
            marginTop: '4rem', flexWrap: 'wrap',
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '0 1.5rem',
                borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div className="font-display text-gold" style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.4rem', letterSpacing: '0.04em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-bar" />
          <span>Rolar</span>
        </div>
      </section>

      {/* ── SOBRE NÓS ── */}
      <section id="sobre" className="about-section">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem', alignItems: 'center',
          }}>
            {/* Text side */}
            <div>
              <div className="section-label">Nossa história</div>
              <h2 className="font-display" style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700,
                lineHeight: 1.15, letterSpacing: '-0.02em',
                marginBottom: '1.5rem', color: 'var(--text)',
              }}>
                Nascemos da{' '}
                <span className="text-gold" style={{ fontStyle: 'italic' }}>paixão</span>{' '}
                por aprender.
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '1rem' }}>
                Somos um estúdio de conteúdo especializado em transformar conhecimento complexo em leitura prazerosa. Cada ebook no nosso acervo passa por uma curadoria cuidadosa antes de chegar até você.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
                Nossa missão é simples: conectar as pessoas certas com o conhecimento certo, no momento exato em que precisam crescer.
              </p>

              <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['Curadoria rigorosa', 'Conteúdo denso', 'Acesso imediato'].map(tag => (
                  <span key={tag} style={{
                    padding: '0.4rem 1rem', borderRadius: 100,
                    border: '1px solid rgba(201,168,76,0.25)',
                    background: 'rgba(201,168,76,0.06)',
                    color: 'var(--gold)', fontSize: '0.78rem',
                    fontWeight: 500, letterSpacing: '0.04em',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Cards side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { icon: '📖', title: 'Títulos', desc: 'Acervo selecionado e crescente de ebooks.' },
                { icon: '🎯', title: 'Foco', desc: 'Conteúdo direto ao ponto, sem enrolação.' },
                { icon: '⚡', title: 'Rápido', desc: 'Acesso instantâneo após a compra.' },
                { icon: '🌱', title: 'Crescimento', desc: 'Conhecimento que transforma perspectivas.' },
              ].map((item, i) => (
                <div key={i} className="stat-card" style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATÁLOGO ── */}
      <section id="catalogo" className="catalog-section">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Acervo completo</div>
            <h2 className="font-display" style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700,
              letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '0.75rem',
            }}>
              Nossos <span className="text-gold">Cursos & Ebooks</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>
              Filtre por categoria e encontre exatamente o que está buscando.
            </p>
          </div>

          {/* Filter pills */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
            justifyContent: 'center', marginBottom: '3rem',
          }}>
            <Link href="/" className={`filter-pill ${categoriaAtiva === 'todos' ? 'active' : ''}`}>
              Todos
            </Link>
            {categorias?.map((cat) => (
              <Link
                key={cat.id}
                href={`/?categoria=${cat.slug}`}
                className={`filter-pill ${categoriaAtiva === cat.slug ? 'active' : ''}`}
              >
                {cat.nome}
              </Link>
            ))}
          </div>

          {/* Ebook grid */}
          {ebooksFiltrados && ebooksFiltrados.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}>
              {ebooksFiltrados.map((ebook) => (
                <EbookCard key={ebook.id} ebook={ebook} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '5rem 2rem',
              border: '1px dashed var(--border)', borderRadius: 24,
              background: 'var(--surface)',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                Nenhum título encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '3rem 2rem',
        background: 'var(--bg-2)',
        textAlign: 'center',
      }}>
        <div className="glow-line" style={{ marginBottom: '2rem', opacity: 0.4 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <div style={{
            width: 28, height: 28,
            background: 'linear-gradient(135deg, #e8c97e, #c9a84c)',
            borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#0d0d0d" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#0d0d0d" strokeWidth="2"/>
            </svg>
          </div>
          <span className="font-display" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>Acervo</span>
        </div>
        <p style={{ color: 'var(--text-subtle)', fontSize: '0.82rem' }}>
          © {new Date().getFullYear()} Acervo. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}
