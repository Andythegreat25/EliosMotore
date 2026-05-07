"use client";
import { Search, TrendingDown, UserPlus, MapPin, ArrowUpRight } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const fornitori = [
  { nome: 'EcoCentro Lombardia SpA', regione: 'Lombardia', volume: '12.500', rating: 4.8, alert: 'Nessuno', lastNego: '12/01/2026', azione: 'Monitora' },
  { nome: 'MetalRecuperi Srl',        regione: 'Veneto',    volume: '8.200',  rating: 3.5, alert: 'Scadenza AIA', lastNego: '05/08/2025', azione: 'Rinegozia' },
  { nome: "Discarica Val d'Adige",    regione: 'Trentino',  volume: '45.000', rating: 4.5, alert: 'Nessuno', lastNego: '22/11/2025', azione: 'Monitora' },
  { nome: 'Inerti Piemonte',          regione: 'Piemonte',  volume: '3.100',  rating: 2.1, alert: 'Performance Bassa', lastNego: '14/03/2025', azione: 'Sostituire' },
  { nome: 'Recuperi Sud',             regione: 'Campania',  volume: '9.800',  rating: 4.0, alert: 'Nessuno', lastNego: '30/10/2025', azione: 'Monitora' },
];

const radarData = [
  { subject: 'Qualità', A: 92 }, { subject: 'Prezzo', A: 78 }, { subject: 'Puntualità', A: 85 },
  { subject: 'Compliance', A: 70 }, { subject: 'Capacità', A: 88 }, { subject: 'Flessibilità', A: 74 },
];

export default function Sourcing() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title-block">
          <h1 className="text-h1">Acquisti / Sourcing</h1>
          <p className="page-subtitle">Vendor management · Copertura geografica · Negoziazione</p>
        </div>
        <button className="btn btn-primary"><UserPlus size={15}/> Nuovo Fornitore</button>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card kpi-success">
          <div className="kpi-header"><span className="kpi-label">Saving Generato MTD</span><div className="kpi-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}><TrendingDown size={16}/></div></div>
          <div className="kpi-value" style={{ color: 'var(--success-text)' }}>€ 18.250</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={12}/> -2.5% costo medio vs budget</div>
        </div>
        <div className="kpi-card kpi-danger">
          <div className="kpi-header"><span className="kpi-label">Impianti a Rischio</span><div className="kpi-icon" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}><MapPin size={16}/></div></div>
          <div className="kpi-value" style={{ color: 'var(--danger-text)' }}>2</div>
          <div className="kpi-trend trend-down">MetalRecuperi · Inerti Piemonte</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Nuovi Fornitori YTD</span><div className="kpi-icon"><UserPlus size={16}/></div></div>
          <div className="kpi-value">5</div>
          <div className="kpi-trend trend-neutral">Obiettivo annuale: 12</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Tabella */}
        <div className="table-container">
          <div className="table-header">
            <span className="text-h2" style={{ fontSize: 15 }}>Vendor Score</span>
            <div className="search-bar" style={{ width: 220 }}>
              <Search size={13} style={{ color: 'var(--on-surface-variant)', flexShrink: 0 }}/>
              <input placeholder="Cerca fornitore…"/>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Fornitore</th><th>Regione</th>
                <th style={{ textAlign: 'right' }}>Vol. YTD (T)</th>
                <th style={{ textAlign: 'center' }}>Rating</th>
                <th>Alert</th><th>Ultima Neg.</th><th>Azione</th>
              </tr>
            </thead>
            <tbody>
              {fornitori.map((f, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{f.nome}</td>
                  <td style={{ color: 'var(--on-surface-variant)' }}>{f.regione}</td>
                  <td style={{ textAlign: 'right', fontWeight: 500 }}>{f.volume}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${f.rating >= 4 ? 'success' : f.rating >= 3 ? 'warning' : 'danger'}`}>{f.rating} / 5</span>
                  </td>
                  <td>
                    {f.alert === 'Nessuno'
                      ? <span style={{ color: 'var(--on-surface-variant)', fontSize: 12 }}>—</span>
                      : <span className="badge danger" style={{ fontSize: 11 }}>{f.alert}</span>}
                  </td>
                  <td style={{ color: 'var(--on-surface-variant)', fontSize: 12 }}>{f.lastNego}</td>
                  <td>
                    <button className={`btn ${f.azione !== 'Monitora' ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '4px 12px', fontSize: 12 }}>
                      {f.azione}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Radar + gap */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card-dark" style={{ padding: '20px 24px 12px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 12 }}>Score Medio Fornitori</div>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)"/>
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#8BA3D4', fontSize: 10 }}/>
                <Tooltip contentStyle={{ background: '#050F2C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }}/>
                <Radar dataKey="A" stroke="#3B6FFF" fill="#3B6FFF" fillOpacity={0.25} strokeWidth={2} dot={{ fill: '#3B6FFF', r: 3 }}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="text-h2" style={{ fontSize: 14, marginBottom: 12 }}>Gap Geografici</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ padding: '10px 12px', background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--danger-text)' }}>Toscana (Centro)</div>
                <div style={{ fontSize: 11, color: 'var(--danger-text)', opacity: 0.85, marginTop: 2 }}>Manca partner CER 170904. Extra +€15/Ton.</div>
                <button className="btn btn-outline" style={{ marginTop: 8, width: '100%', fontSize: 11, padding: '4px 8px', borderColor: 'var(--danger-border)', color: 'var(--danger-text)' }}>Avvia Ricerca</button>
              </div>
              <div style={{ padding: '10px 12px', background: 'var(--warning-bg)', border: '1px solid var(--warning-border)', borderRadius: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--warning-text)' }}>Lazio (Roma Sud)</div>
                <div style={{ fontSize: 11, color: 'var(--warning-text)', opacity: 0.85, marginTop: 2 }}>Saturazione 85%. Rischio blocco Q3.</div>
                <button className="btn btn-outline" style={{ marginTop: 8, width: '100%', fontSize: 11, padding: '4px 8px', borderColor: 'var(--warning-border)', color: 'var(--warning-text)' }}>Valuta Alternative</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

