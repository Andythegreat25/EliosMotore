"use client";
import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, TrendingUp, Package, DollarSign, ShieldAlert, MoreHorizontal } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

// ── Mock Data ────────────────────────────────────────────────
const volumeData = [
  { g: 'Dic', v: 38200 }, { g: 'Gen', v: 41000 }, { g: 'Feb', v: 39500 },
  { g: 'Mar', v: 43800 }, { g: 'Apr', v: 40200 }, { g: 'Mag', v: 45210 },
];

const margineData = [
  { cer: '17 04 05', m: 23 }, { cer: '17 09 04', m: -4 },
  { cer: '17 01 07', m: 7  }, { cer: '15 01 06', m: 25 },
  { cer: '17 05 04', m: 12 },
];

const recentTrx = [
  { id: 'TRX-1092', impianto: 'EcoCentro Lombardia',    cer: '17 04 05', qty: '120 T', data: 'Oggi 09:14',  status: 'Operativo' },
  { id: 'TRX-1091', impianto: 'Recuperi Nord Est',       cer: '17 09 04', qty: '85 T',  data: 'Oggi 08:52',  status: 'Operativo' },
  { id: 'TRX-1090', impianto: "Discarica Val d'Adige",   cer: '17 01 07', qty: '200 T', data: 'Ieri 16:30',  status: 'Attenzione' },
  { id: 'TRX-1089', impianto: 'MetalRecuperi Srl',        cer: '17 04 05', qty: '45 T',  data: 'Ieri 14:11',  status: 'Rifiutato' },
  { id: 'TRX-1088', impianto: 'Inerti Piemonte',          cer: '17 05 04', qty: '310 T', data: 'Ieri 11:05',  status: 'Operativo' },
];

const alerts = [
  { type: 'danger',  title: 'Omologa in scadenza domani',     body: 'MetalRecuperi — CER 17 04 05. Rinnovo richiesto entro 24h.' },
  { type: 'warning', title: 'Pricing mancante su gara',        body: '"Cantiere Milano Sud" — Costi trasporto non inseriti.' },
  { type: 'warning', title: 'Impianto saturato all\'85%',      body: 'Lazio (Roma Sud) — Rischio blocco conferimenti Q3.' },
];

// ── Number Ticker ─────────────────────────────────────────────
function Ticker({ target, prefix = '', suffix = '', duration = 1200 }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const num = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    const animate = (now) => {
      const prog = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setVal(Math.round(eased * num));
      if (prog < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return <span>{prefix}{val.toLocaleString('it-IT')}{suffix}</span>;
}

// ── Custom Tooltip ────────────────────────────────────────────
const AreaTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#050F2C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px' }}>
      <div style={{ color: '#8BA3D4', fontSize: 11, marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{payload[0].value.toLocaleString('it-IT')} T</div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────
export default function ControlTower() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-block">
          <h1 className="text-h1">Control Tower</h1>
          <p className="page-subtitle">Vista globale della filiera C&D · Dati aggiornati in tempo reale</p>
        </div>
        <button className="btn btn-primary">
          <TrendingUp size={15} />
          Scarica Report Mensile
        </button>
      </div>

      {/* KPI Row */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Volume Gestito (Mese)</span>
            <div className="kpi-icon"><Package size={16} /></div>
          </div>
          <div className="kpi-value"><Ticker target={45210} suffix=" T" /></div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={12} /> +12.5% vs mese prec.</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Saving Potenziale YTD</span>
            <div className="kpi-icon"><DollarSign size={16} /></div>
          </div>
          <div className="kpi-value"><Ticker target={142500} prefix="€ " /></div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={12} /> +4.2% vs budget</div>
        </div>

        <div className="kpi-card kpi-danger">
          <div className="kpi-header">
            <span className="kpi-label">Alert Compliance</span>
            <div className="kpi-icon" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}><ShieldAlert size={16} /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}><Ticker target={3} /></div>
          <div className="kpi-trend trend-down"><AlertTriangle size={12} /> 2 omologhe · 1 autorizzazione</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Margine Medio</span>
            <div className="kpi-icon"><TrendingUp size={16} /></div>
          </div>
          <div className="kpi-value"><Ticker target={18} suffix=".4%" /></div>
          <div className="kpi-trend trend-down"><ArrowDownRight size={12} /> -1.2% vs mese prec.</div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', marginBottom: '20px' }}>

        {/* Area Chart — Volume */}
        <div className="card-dark" style={{ padding: '24px 24px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#fff' }}>Volumi Movimentati (6 mesi)</div>
              <div style={{ fontSize: 12, color: '#8BA3D4', marginTop: 2 }}>Tonnellate conferite per mese</div>
            </div>
            <span className="badge info">+12.5% MoM</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={volumeData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gradV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3B6FFF" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B6FFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="g" tick={{ fill: '#8BA3D4', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8BA3D4', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<AreaTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
              <Area type="monotone" dataKey="v" stroke="#3B6FFF" strokeWidth={2.5} fill="url(#gradV)" dot={false} activeDot={{ r: 5, fill: '#3B6FFF', stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart — Margine CER */}
        <div className="card" style={{ padding: '24px 24px 16px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div className="text-h2" style={{ fontSize: 15 }}>Margine per Filiera (€/T)</div>
            <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>CER principali · mese corrente</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={margineData} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" vertical={false} />
              <XAxis dataKey="cer" tick={{ fill: 'var(--on-surface-variant)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--on-surface-variant)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid var(--outline-variant)', borderRadius: 8, fontSize: 13 }}
                formatter={(v) => [`€ ${v}/T`, 'Margine']}
              />
              <Bar dataKey="m" radius={[4, 4, 0, 0]} maxBarSize={36}>
                {margineData.map((d, i) => (
                  <Cell key={i} fill={d.m >= 0 ? '#3B6FFF' : '#DC2626'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table + Alerts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>

        {/* Transazioni recenti */}
        <div className="table-container">
          <div className="table-header">
            <span className="text-h2" style={{ fontSize: 15 }}>Ultime Transazioni</span>
            <button className="btn btn-ghost" style={{ padding: '5px 10px', fontSize: 13 }}>Vedi Tutte</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Impianto</th>
                <th>CER</th>
                <th style={{ textAlign: 'right' }}>Quantità</th>
                <th>Data / Ora</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {recentTrx.map(t => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--electric)', fontWeight: 600, fontFamily: 'var(--font-display)', fontSize: 13 }}>{t.id}</td>
                  <td style={{ fontWeight: 500 }}>{t.impianto}</td>
                  <td><span className="badge neutral">{t.cer}</span></td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{t.qty}</td>
                  <td style={{ color: 'var(--on-surface-variant)', fontSize: 12 }}>{t.data}</td>
                  <td>
                    <span className={`badge ${t.status === 'Operativo' ? 'success' : t.status === 'Attenzione' ? 'warning' : 'danger'}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Azioni prioritarie */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span className="text-h2" style={{ fontSize: 15 }}>Azioni Prioritarie</span>
            <span className="badge danger">3 aperte</span>
          </div>

          {alerts.map((a, i) => (
            <div key={i} style={{
              display: 'flex', gap: '12px', padding: '12px 14px',
              background: a.type === 'danger' ? 'var(--danger-bg)' : 'var(--warning-bg)',
              border: `1px solid ${a.type === 'danger' ? 'var(--danger-border)' : 'var(--warning-border)'}`,
              borderRadius: 8,
            }}>
              <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1, color: a.type === 'danger' ? 'var(--danger)' : 'var(--warning)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: a.type === 'danger' ? 'var(--danger-text)' : 'var(--warning-text)', marginBottom: 2 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: a.type === 'danger' ? 'var(--danger-text)' : 'var(--warning-text)', opacity: 0.8 }}>{a.body}</div>
              </div>
            </div>
          ))}

          <button className="btn btn-outline" style={{ marginTop: 'auto', width: '100%' }}>
            Gestisci Tutti gli Alert
          </button>
        </div>
      </div>
    </div>
  );
}

