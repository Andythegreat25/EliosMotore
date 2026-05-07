"use client";
import { ArrowRight, AlertCircle, Clock, CheckCircle, Trophy } from 'lucide-react';
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts';

const gare = [
  { id: 'GAR-01', nome: 'Cantiere Milano Sud - M4', cliente: 'Webuild SpA',    volume: '15.000', valore: '850.000', scadenza: 'Oggi',     fase: 'Qualifica',    rischio: 'Alto' },
  { id: 'GAR-02', nome: 'Polo Logistico Verona',    cliente: 'Pizzarotti & C.',volume: '8.500',  valore: '340.000', scadenza: 'Tra 5gg',  fase: 'Elaborazione', rischio: 'Medio' },
  { id: 'GAR-03', nome: 'Nuovo Ospedale Padova',    cliente: 'CMB',            volume: '22.000', valore: '1.200.000',scadenza:'Tra 12gg', fase: 'Negoziazione', rischio: 'Basso' },
  { id: 'GAR-04', nome: 'Riqualificazione Ex Falck',cliente: 'Hines',          volume: '120.000',valore: '4.500.000',scadenza:'-',        fase: 'Vinta',        rischio: 'Basso' },
];

const funnelData = [
  { value: 12, name: 'Lead', fill: 'rgba(59,111,255,0.3)' },
  { value: 8,  name: 'Qualifica', fill: 'rgba(59,111,255,0.5)' },
  { value: 5,  name: 'Offerta', fill: 'rgba(59,111,255,0.7)' },
  { value: 3,  name: 'Negoziazione', fill: '#3B6FFF' },
  { value: 1,  name: 'Vinta', fill: '#059669' },
];

export default function Gare() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title-block">
          <h1 className="text-h1">Gare / Opportunità</h1>
          <p className="page-subtitle">Pipeline appalti · Scadenze · Win rate commerciale</p>
        </div>
        <button className="btn btn-primary"><Trophy size={15}/> Nuova Gara</button>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Gare Attive</span><div className="kpi-icon"><Trophy size={16}/></div></div>
          <div className="kpi-value">12</div>
          <div className="kpi-trend trend-neutral">3 in chiusura questa settimana</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Valore Pipeline</span><div className="kpi-icon"><ArrowRight size={16}/></div></div>
          <div className="kpi-value">€ 3.450.000</div>
          <div className="kpi-trend trend-neutral">4 opportunità visibili</div>
        </div>
        <div className="kpi-card kpi-success">
          <div className="kpi-header"><span className="kpi-label">Win Rate YTD</span><div className="kpi-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}><CheckCircle size={16}/></div></div>
          <div className="kpi-value" style={{ color: 'var(--success-text)' }}>38.5%</div>
          <div className="kpi-trend trend-up">Target: 40%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        {/* Tabella gare */}
        <div className="table-container">
          <div className="table-header">
            <span className="text-h2" style={{ fontSize: 15 }}>Pipeline Gare & Appalti</span>
            <span className="badge info">4 record</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Fase</th><th>Cantiere / Progetto</th><th>Cliente</th>
                <th style={{ textAlign: 'right' }}>Volume (T)</th>
                <th style={{ textAlign: 'right' }}>Valore (€)</th>
                <th>Scadenza</th><th>Rischio</th><th/>
              </tr>
            </thead>
            <tbody>
              {gare.map(g => (
                <tr key={g.id}>
                  <td>
                    <span className={`badge ${g.fase === 'Vinta' ? 'success' : g.fase === 'Negoziazione' ? 'warning' : 'info'}`}>{g.fase}</span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{g.nome}</td>
                  <td style={{ color: 'var(--on-surface-variant)' }}>{g.cliente}</td>
                  <td style={{ textAlign: 'right', fontWeight: 500 }}>{g.volume}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>€ {g.valore}</td>
                  <td style={{ color: g.scadenza === 'Oggi' ? 'var(--danger-text)' : 'inherit', fontWeight: g.scadenza === 'Oggi' ? 700 : 400, fontSize: 13 }}>{g.scadenza}</td>
                  <td>
                    {g.rischio === 'Alto' && <AlertCircle size={15} style={{ color: 'var(--danger)' }}/>}
                    {g.rischio === 'Medio' && <Clock size={15} style={{ color: 'var(--warning)' }}/>}
                    {g.rischio === 'Basso' && <CheckCircle size={15} style={{ color: 'var(--success)' }}/>}
                  </td>
                  <td>
                    <button className="btn btn-ghost" style={{ padding: '3px 8px', fontSize: 12 }}>
                      Proposal <ArrowRight size={11}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Funnel */}
        <div className="card-dark" style={{ padding: '20px 24px 12px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 12 }}>Sales Funnel</div>
          <ResponsiveContainer width="100%" height={260}>
            <FunnelChart>
              <Tooltip contentStyle={{ background: '#050F2C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }}/>
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                <LabelList position="right" fill="#8BA3D4" stroke="none" dataKey="name" style={{ fontSize: 12 }}/>
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

