"use client";
import { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, CheckCircle } from 'lucide-react';

const impianti = [
  { nome: 'EcoCentro Lombardia', distanza: 18, tariffaBase: 38, capResidua: 45000, cerCompatibili: ['17 09 04', '17 04 05', '17 01 07'], rating: 4.8 },
  { nome: 'Discarica Val d\'Adige', distanza: 42, tariffaBase: 31, capResidua: 82000, cerCompatibili: ['17 09 04', '17 01 07'], rating: 4.5 },
  { nome: 'GreenWaste Toscana', distanza: 95, tariffaBase: 35, capResidua: 22000, cerCompatibili: ['17 09 04', '17 04 05'], rating: 4.2 },
  { nome: 'Nord Inerti Liguria', distanza: 65, tariffaBase: 29, capResidua: 55000, cerCompatibili: ['17 09 04', '17 01 07', '17 05 04'], rating: 4.6 },
];

const KM_COST = 0.18;

export default function ProposalManager() {
  const [volume, setVolume] = useState(500);
  const [gara] = useState('Cantiere Milano Sud - M4');

  const risultati = impianti
    .filter(i => i.cerCompatibili.includes('17 09 04'))
    .map(i => {
      const trsp = i.distanza * KM_COST;
      const totUnit = i.tariffaBase + trsp;
      const totale = totUnit * volume;
      return { ...i, trsp: trsp.toFixed(2), totUnit: totUnit.toFixed(2), totale: Math.round(totale) };
    })
    .sort((a, b) => a.totale - b.totale);

  return (
    <div>
      <div className="page-header">
        <div className="page-title-block">
          <h1 className="text-h1">Proposal Manager</h1>
          <p className="page-subtitle">Costruisci offerte ottimizzate per costo e logistica</p>
        </div>
        <button className="btn btn-primary"><ArrowRight size={15}/> Genera Offerta PDF</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
        {/* Config panel */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calculator size={18} style={{ color: '#6B96FF' }}/>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff' }}>Configurazione Gara</span>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8BA3D4', marginBottom: 6 }}>Nome Cantiere</div>
            <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 500 }}>{gara}</div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8BA3D4', marginBottom: 6 }}>Codice CER</div>
            <div style={{ padding: '10px 14px', background: 'rgba(59,111,255,0.2)', border: '1px solid rgba(59,111,255,0.4)', borderRadius: 8, color: '#6B96FF', fontSize: 14, fontWeight: 700 }}>17 09 04 — Macerie Miste</div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8BA3D4', marginBottom: 6 }}>Volume Stimato (Ton)</div>
            <input type="number" value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-display)' }}
            />
          </div>

          <div style={{ padding: '12px 14px', background: 'rgba(0,0,0,0.2)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 11, color: '#8BA3D4', marginBottom: 4 }}>Risparmio Best vs Worst</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#34d399' }}>
              € {(risultati.at(-1)?.totale - risultati[0]?.totale || 0).toLocaleString('it-IT')}
            </div>
            <div style={{ fontSize: 11, color: '#8BA3D4', marginTop: 2 }}>scegliendo l'opzione migliore</div>
          </div>
        </div>

        {/* Risultati */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {risultati.map((r, i) => (
            <div key={r.nome}
              style={{
                background: i === 0 ? 'linear-gradient(135deg,#0A2472,#0D1E4A)' : 'var(--surface)',
                border: i === 0 ? '2px solid var(--electric)' : '1px solid var(--outline-variant)',
                borderRadius: 'var(--radius)',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: i === 0 ? '0 8px 24px rgba(59,111,255,0.2)' : 'var(--shadow-sm)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: i === 0 ? 'var(--electric)' : 'var(--surface-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14,
                color: i === 0 ? '#fff' : 'var(--on-surface-variant)',
              }}>
                {i === 0 ? <CheckCircle size={18}/> : `#${i + 1}`}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: i === 0 ? '#fff' : 'var(--on-surface)' }}>{r.nome}</div>
                <div style={{ fontSize: 12, color: i === 0 ? '#8BA3D4' : 'var(--on-surface-variant)', marginTop: 2 }}>
                  {r.distanza} km · Tariffa base €{r.tariffaBase}/T · Trasporto €{r.trsp}/T · Rating {r.rating}/5
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: i === 0 ? '#8BA3D4' : 'var(--on-surface-variant)', marginBottom: 2 }}>Costo Totale Stimato</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: i === 0 ? '#34d399' : 'var(--on-surface)' }}>
                  € {r.totale.toLocaleString('it-IT')}
                </div>
                <div style={{ fontSize: 11, color: i === 0 ? '#8BA3D4' : 'var(--on-surface-variant)' }}>€ {r.totUnit}/T tot</div>
              </div>

              {i === 0 && (
                <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                  Seleziona <ArrowRight size={14}/>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

