"use client";

export interface EbookCardData {
  id?: string;
  em_promocao: boolean;
  imagem_url: string;
  titulo: string;
  descricao?: string | null;
  preco_original: number;
  preco_promocional?: number | null;
  link_hotmart: string;
}

export default function EbookCard({ ebook }: { ebook: EbookCardData }) {
  const descricao = ebook.descricao ?? "";
  const priceFormatted = (val: number) =>
    val.toFixed(2).replace('.', ',');

  return (
    <div className="ebook-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Offer badge */}
      {ebook.em_promocao && (
        <div className="offer-badge">Oferta</div>
      )}

      {/* Cover Image */}
      <div style={{
        height: 260, overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a1a1a, #222)',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ebook.imagem_url}
          alt={ebook.titulo}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        {/* Image overlay gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
          background: 'linear-gradient(transparent, rgba(26,26,26,0.9))',
        }} />
      </div>

      {/* Content */}
      <div style={{
        padding: '1.5rem', display: 'flex', flexDirection: 'column',
        gap: '0.75rem', flex: 1,
      }}>
        <h3 className="font-display" style={{
          fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.3,
          color: 'var(--text)', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {ebook.titulo}
        </h3>

        <p style={{
          fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1,
        }}>
          {descricao}
        </p>

        {/* Price section */}
        <div style={{
          padding: '1rem', borderRadius: 12,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          marginTop: 'auto',
        }}>
          {ebook.em_promocao &&
          ebook.preco_promocional != null &&
          ebook.preco_original > 0 ? (
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', textDecoration: 'line-through', marginBottom: 2 }}>
                  R$ {priceFormatted(ebook.preco_original)}
                </div>
                <div className="text-gold font-display" style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1 }}>
                  R$ {priceFormatted(ebook.preco_promocional)}
                </div>
              </div>
              <div style={{
                background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.2)',
                color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 600,
                padding: '0.3rem 0.6rem', borderRadius: 100, letterSpacing: '0.06em',
              }}>
                {Math.round(
                  (1 - ebook.preco_promocional / ebook.preco_original) * 100
                )}
                % OFF
              </div>
            </div>
          ) : (
            <div className="font-display text-gold" style={{ fontSize: '1.6rem', fontWeight: 700 }}>
              R$ {priceFormatted(ebook.preco_original)}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <a href={ebook.link_hotmart} target="_blank" rel="noopener noreferrer" className="btn-buy">
          Adquirir Agora
        </a>
      </div>
    </div>
  );
}
