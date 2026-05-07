"use client";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';

const marginiCER = [
  { cer: '17 04 05', desc: 'Ferro e Acciaio',   volume: 15200, ricavo: 65, costo: 42, margine: 23, status: 'Profittevole' },
  { cer: '17 09 04', desc: 'Macerie Miste',      volume: 45000, ricavo: 18, costo: 22, margine: -4, status: 'In Perdita' },
  { cer: '17 01 07', desc: 'Miscele Cemento',    volume: 22000, ricavo: 25, costo: 18, margine: 7,  status: 'Profittevole' },
  { cer: '15 01 06', desc: 'Imballaggi Misti',   volume: 8500,  ricavo: 110, costo: 85, margine: 25, status: 'Profittevole' },
  { cer: '17 05 04', desc: 'Terra e Rocce',      volume: 31000, ricavo: 14, costo: 11, margine: 3,  status: 'Profittevole' },
];

const trendMensile = [
  { m: 'Dic', mg: 15.2 }, { m: 'Gen', mg: 17.8 }, { m: 'Feb', mg: 16.1 },
  { m: 'Mar', mg: 19.4 }, { m: 'Apr', mg: 19.6 }, { m: 'Mag', mg: 18.4 },
];

export default function AnalisiCosti() {
  const totRicavi = 4500000;
  const totLogistica = 850000;
  const totImpianti = 2400000;
  const margineOp = totRicavi - totLogistica - totImpianti;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-block">
          <h1 className="text-h1">Analisi Costi & Margini</h1>
          <p className="page-subtitle">Breakdown economico YTD · Profittabilità per filiera CER</p>
        </div>
        <button className="btn btn-primary"><TrendingUp size={15}/> Esporta P&L</button>
      </div>

      {/* KPI */}
      <div className="kpi-grid">
        <div className="kpi-card kpi-success">
          <div className="kpi-header"><span className="kpi-label">Margine Lordo YTD</span><div className="kpi-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}><DollarSign size={16}/></div></div>
          <div className="kpi-value" style={{ color: 'var(--success-text)' }}>€ 1.250.000</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={12}/> +8.5% vs 2025</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Costo Medio Smalt.</span><div className="kpi-icon"><TrendingDown size={16}/></div></div>
          <div className="kpi-value">€ 38,50/T</div>
          <div className="kpi-trend trend-up"><ArrowDownRight size={12}/> -1.2% vs budget</div>
        </div>
        <div className="kpi-card kpi-danger">
          <div className="kpi-header"><span className="kpi-label">Varianza vs Budget</span><div className="kpi-icon" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}><TrendingDown size={16}/></div></div>
          <div className="kpi-value" style={{ color: 'var(--danger-text)' }}>- € 45.000</div>
          <div className="kpi-trend trend-down"><ArrowDownRight size={12}/> Extra-costi logistici</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Margine Medio %</span><div className="kpi-icon"><TrendingUp size={16}/></div></div>
          <div className="kpi-value">18.4%</div>
          <div className="kpi-trend trend-down"><ArrowDownRight size={12}/> Target: 22%</div>
        </div>
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Bar margine CER */}
        <div className="card" style={{ padding: '22px 24px 14px' }}>
          <div style={{ marginBottom: 18 }}>
            <div className="text-h2" style={{ fontSize: 15 }}>Margine per Filiera CER (€/T)</div>
            <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>Rosso = in perdita</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={marginiCER} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" vertical={false}/>
              <XAxis dataKey="cer" tick={{ fill: 'var(--on-surface-variant)', fontSize: 10 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: 'var(--on-surface-variant)', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid var(--outline-variant)', borderRadius: 8, fontSize: 13 }} formatter={v => [`€ ${v}/T`, 'Margine']}/>
              <Bar dataKey="margine" radius={[4, 4, 0, 0]} maxBarSize={40}>
                {marginiCER.map((d, i) => <Cell key={i} fill={d.margine >= 0 ? '#3B6FFF' : '#DC2626'}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line trend margine */}
        <div className="card-dark" style={{ padding: '22px 24px 14px' }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff' }}>Trend Margine Medio % (6 mesi)</div>
            <div style={{ fontSize: 12, color: '#8BA3D4', marginTop: 2 }}>Target: 22%</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trendMensile} margin={{ top: 0, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false}/>
              <XAxis dataKey="m" tick={{ fill: '#8BA3D4', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis domain={[12, 25]} tick={{ fill: '#8BA3D4', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`}/>
              <Tooltip contentStyle={{ background: '#050F2C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 13 }} formatter={v => [`${v}%`, 'Margine']}/>
              <Line type="monotone" dataKey="mg" stroke="#34d399" strokeWidth={2.5} dot={{ fill: '#34d399', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: '#34d399', stroke: '#fff', strokeWidth: 2 }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown + Tabella */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        {/* Breakdown verticale */}
        <div className="card-accent" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>P&L Semplificato YTD</div>

          {[
            { label: 'Ricavi Totali', val: `€ ${totRicavi.toLocaleString('it-IT')}`, positive: true, bold: false },
            { label: '(-) Logistica & Trasporti', val: `− € ${totLogistica.toLocaleString('it-IT')}`, positive: false, bold: false },
            { label: '(-) Impianti & Smaltimento', val: `− € ${totImpianti.toLocaleString('it-IT')}`, positive: false, bold: false },
          ].map((row, i) => (
            <div key={i} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, opacity: 0.85 }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }}>{row.val}</span>
            </div>
          ))}

          <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '4px 0' }}/>
          <div style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.2)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Margine Operativo</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>€ {margineOp.toLocaleString('it-IT')}</span>
          </div>
        </div>

        {/* Tabella filiera */}
        <div className="table-container">
          <div className="table-header">
            <span className="text-h2" style={{ fontSize: 15 }}>Dettaglio per Filiera</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Codice CER</th>
                <th style={{ textAlign: 'right' }}>Vol. (T)</th>
                <th style={{ textAlign: 'right' }}>Ricavo (€/T)</th>
                <th style={{ textAlign: 'right' }}>Costo (€/T)</th>
                <th style={{ textAlign: 'right' }}>Margine (€/T)</th>
                <th style={{ textAlign: 'center' }}>Stato</th>
              </tr>
            </thead>
            <tbody>
              {marginiCER.map((m, i) => (
                <tr key={i} style={{ background: m.status === 'In Perdita' ? 'var(--danger-bg)' : undefined }}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{m.cer}</div>
                    <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>{m.desc}</div>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 500 }}>{m.volume.toLocaleString()}</td>
                  <td style={{ textAlign: 'right' }}>€ {m.ricavo}</td>
                  <td style={{ textAlign: 'right' }}>€ {m.costo}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: m.margine >= 0 ? 'var(--success-text)' : 'var(--danger-text)' }}>€ {m.margine}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${m.status === 'Profittevole' ? 'success' : 'danger'}`}>{m.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

