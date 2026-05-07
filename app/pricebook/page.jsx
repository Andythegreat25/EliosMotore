"use client";
import { Search, Edit2, Save, BookOpen } from 'lucide-react';

const pricebook = [
  { cer: '17 09 04', desc: 'Macerie Miste',    impianti: [{ nome: 'EcoCentro', tariffa: 18 }, { nome: "Val d'Adige", tariffa: 15 }, { nome: 'Nord Inerti', tariffa: 17 }] },
  { cer: '17 04 05', desc: 'Ferro e Acciaio',  impianti: [{ nome: 'EcoCentro', tariffa: 42 }, { nome: 'MetalRecuperi', tariffa: 38 }, { nome: 'Recuperi Sud', tariffa: 44 }] },
  { cer: '17 01 07', desc: 'Miscele Cemento',  impianti: [{ nome: "Val d'Adige", tariffa: 22 }, { nome: 'Nord Inerti', tariffa: 19 }, { nome: 'GreenWaste', tariffa: 24 }] },
  { cer: '15 01 06', desc: 'Imballaggi Misti', impianti: [{ nome: 'EcoCentro', tariffa: 85 }, { nome: 'Recuperi Sud', tariffa: 90 }] },
  { cer: '17 05 04', desc: 'Terra e Rocce',    impianti: [{ nome: 'Nord Inerti', tariffa: 11 }, { nome: "Val d'Adige", tariffa: 9 }, { nome: 'GreenWaste', tariffa: 13 }] },
];

export default function Pricebook() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title-block">
          <h1 className="text-h1">Pricebook Master</h1>
          <p className="page-subtitle">Listino tariffe per filiera CER · Aggiornamento massivo</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline"><Edit2 size={14}/> Modifica Massiva</button>
          <button className="btn btn-primary"><Save size={14}/> Salva Versione</button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="search-bar" style={{ width: 280 }}>
            <Search size={13} style={{ color: 'var(--on-surface-variant)', flexShrink: 0 }}/>
            <input placeholder="Cerca CER o impianto…"/>
          </div>
          <span className="badge neutral">{pricebook.length} filiere</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>Versione 2026-Q2 · Approvata il 01/04/2026</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {pricebook.map(row => (
          <div key={row.cer} className="table-container">
            <div className="table-header" style={{ background: 'var(--surface-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--electric-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={16} style={{ color: 'var(--electric)' }}/>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }}>CER {row.cer}</div>
                  <div style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>{row.desc}</div>
                </div>
              </div>
              <span className="badge info">{row.impianti.length} impianti</span>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Impianto</th>
                  <th style={{ textAlign: 'right' }}>Tariffa Attuale (€/T)</th>
                  <th style={{ textAlign: 'right' }}>Tariffa Precedente (€/T)</th>
                  <th style={{ textAlign: 'right' }}>Delta</th>
                  <th>Validità</th>
                  <th/>
                </tr>
              </thead>
              <tbody>
                {row.impianti.map((imp, i) => {
                  const prev = Math.round(imp.tariffa * (1 + (Math.random() * 0.1 - 0.05)));
                  const delta = imp.tariffa - prev;
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{imp.nome}</td>
                      <td style={{ textAlign: 'right', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>€ {imp.tariffa}</td>
                      <td style={{ textAlign: 'right', color: 'var(--on-surface-variant)', fontSize: 13 }}>€ {prev}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={`badge ${delta > 0 ? 'danger' : delta < 0 ? 'success' : 'neutral'}`} style={{ fontSize: 11 }}>
                          {delta >= 0 ? '+' : ''}{delta} €
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>31/12/2026</td>
                      <td>
                        <button className="btn btn-ghost" style={{ padding: '3px 8px', fontSize: 12 }}><Edit2 size={12}/></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

