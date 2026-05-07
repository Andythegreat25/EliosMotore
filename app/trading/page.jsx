"use client";
import { useState } from 'react';
import { Calculator, TrendingUp, ArrowUpRight, ArrowDownRight, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const pipeline = [
  { id: 'OPP-041', cer: '17 09 04', cliente: 'Impresa Guerrini', acquisto: 18, vendita: 28, volume: 800, stato: 'Aperta' },
  { id: 'OPP-040', cer: '17 04 05', cliente: 'Cantiere Expo 2',  acquisto: 42, vendita: 65, volume: 420, stato: 'Trattativa' },
  { id: 'OPP-039', cer: '15 01 06', cliente: 'Edilgen Srl',       acquisto: 85, vendita: 108, volume: 150, stato: 'Chiusa' },
  { id: 'OPP-038', cer: '17 01 07', cliente: 'GreenBuild SpA',    acquisto: 16, vendita: 22,  volume: 600, stato: 'Aperta' },
];

const trendData = [
  { m: 'Gen', v: 180000 }, { m: 'Feb', v: 210000 }, { m: 'Mar', v: 195000 },
  { m: 'Apr', v: 240000 }, { m: 'Mag', v: 285000 },
];

export default function Trading() {
  const [calcData, setCalcData] = useState({ ton: 500, ricavo: 65, costoImp: 42, costoTrasp: 8 });
  const margineUnit = calcData.ricavo - calcData.costoImp - calcData.costoTrasp;
  const margineAss  = margineUnit * calcData.ton;
  const marginePerc = calcData.ricavo > 0 ? (margineUnit / calcData.ricavo) * 100 : 0;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-block">
          <h1 className="text-h1">Trading / Cat. 8</h1>
          <p className="page-subtitle">Intermediazione rifiuti · Simulazione margini in tempo reale</p>
        </div>
        <button className="btn btn-primary"><BarChart2 size={15} /> Nuovo Deal</button>
      </div>

      {/* KPI */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Valore Pipeline</span><div className="kpi-icon"><TrendingUp size={16}/></div></div>
          <div className="kpi-value">€ 285.000</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={12}/> +18% vs Apr</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Opportunità Aperte</span><div className="kpi-icon"><BarChart2 size={16}/></div></div>
          <div className="kpi-value">8</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={12}/> 3 in chiusura</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Margine Medio</span><div className="kpi-icon"><Calculator size={16}/></div></div>
          <div className="kpi-value">22.4%</div>
          <div className="kpi-trend trend-down"><ArrowDownRight size={12}/> Target: 25%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', marginBottom: '20px' }}>
        {/* Trend pipeline */}
        <div className="card-dark" style={{ padding: '22px 24px 14px' }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff' }}>Andamento Pipeline (€)</div>
            <div style={{ fontSize: 12, color: '#8BA3D4', marginTop: 2 }}>Valore totale opportunità per mese</div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={trendData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gradT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6B96FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6B96FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false}/>
              <XAxis dataKey="m" tick={{ fill: '#8BA3D4', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: '#8BA3D4', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`}/>
              <Tooltip contentStyle={{ background: '#050F2C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 13 }} formatter={v => [`€ ${v.toLocaleString('it-IT')}`, 'Valore']}/>
              <Area type="monotone" dataKey="v" stroke="#6B96FF" strokeWidth={2} fill="url(#gradT)" dot={false} activeDot={{ r: 5, fill: '#6B96FF', stroke: '#fff', strokeWidth: 2 }}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Simulatore Margini */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calculator size={20} style={{ color: '#6B96FF' }}/>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff' }}>Simulatore Margine</span>
          </div>

          {[
            { label: 'Volume (Ton)', key: 'ton', color: 'rgba(255,255,255,0.2)' },
            { label: 'Ricavo Cliente (€/T)', key: 'ricavo', color: '#34d399' },
            { label: 'Costo Impianto (€/T)', key: 'costoImp', color: '#f87171' },
            { label: 'Costo Trasporto (€/T)', key: 'costoTrasp', color: '#f87171' },
          ].map(f => (
            <div key={f.key}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#8BA3D4', marginBottom: 5 }}>{f.label}</div>
              <input type="number" value={calcData[f.key]}
                onChange={e => setCalcData(p => ({ ...p, [f.key]: Number(e.target.value) }))}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: `1px solid ${f.color}`, background: 'rgba(255,255,255,0.07)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500 }}
              />
            </div>
          ))}

          <div style={{ marginTop: 4, padding: '14px 16px', background: 'rgba(0,0,0,0.25)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: '#8BA3D4', fontWeight: 600 }}>Margine Totale</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: margineAss >= 0 ? '#34d399' : '#f87171' }}>
                € {margineAss.toLocaleString('it-IT')}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#8BA3D4', fontWeight: 600 }}>Markup %</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: marginePerc >= 20 ? '#34d399' : '#fbbf24' }}>
                {marginePerc.toFixed(1)} %
              </span>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg,#3B6FFF,#1a4fff)' }}>
            Crea Opportunità
          </button>
        </div>
      </div>

      {/* Pipeline table */}
      <div className="table-container">
        <div className="table-header">
          <span className="text-h2" style={{ fontSize: 15 }}>Pipeline Opportunità</span>
          <span className="badge info">{pipeline.length} record</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th><th>CER</th><th>Cliente</th>
              <th style={{ textAlign: 'right' }}>Acq. (€/T)</th>
              <th style={{ textAlign: 'right' }}>Vend. (€/T)</th>
              <th style={{ textAlign: 'right' }}>Margine (€/T)</th>
              <th style={{ textAlign: 'right' }}>Volume</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>
            {pipeline.map(r => {
              const m = r.vendita - r.acquisto;
              return (
                <tr key={r.id}>
                  <td style={{ color: 'var(--electric)', fontWeight: 600, fontSize: 13 }}>{r.id}</td>
                  <td><span className="badge neutral">{r.cer}</span></td>
                  <td style={{ fontWeight: 500 }}>{r.cliente}</td>
                  <td style={{ textAlign: 'right' }}>€ {r.acquisto}</td>
                  <td style={{ textAlign: 'right', color: 'var(--success-text)', fontWeight: 600 }}>€ {r.vendita}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: m >= 0 ? 'var(--success-text)' : 'var(--danger-text)' }}>€ {m}/T</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{r.volume.toLocaleString()} T</td>
                  <td>
                    <span className={`badge ${r.stato === 'Aperta' ? 'info' : r.stato === 'Trattativa' ? 'warning' : 'success'}`}>{r.stato}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

