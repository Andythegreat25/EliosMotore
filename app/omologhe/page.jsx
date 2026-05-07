"use client";
import { CheckCircle, XCircle, AlertTriangle, FileText, ShieldCheck } from 'lucide-react';

const cers = ['17 04 05', '17 09 04', '17 01 07', '17 05 04', '15 01 06'];
const impianti = [
  { nome: 'EcoCentro Lombardia',     status: ['Validata', 'Validata', 'In Scadenza', 'Non Richiesta', 'Validata'] },
  { nome: 'Recuperi Nord Est',        status: ['Validata', 'Rifiutata', 'Validata', 'Validata', 'Non Richiesta'] },
  { nome: "Discarica Val d'Adige",    status: ['Non Richiesta', 'Validata', 'Validata', 'Sospesa', 'Non Richiesta'] },
  { nome: 'MetalRecuperi Srl',         status: ['Validata', 'Non Richiesta', 'Non Richiesta', 'Non Richiesta', 'In Scadenza'] },
  { nome: 'Inerti Piemonte',           status: ['Non Richiesta', 'Validata', 'Validata', 'Non Richiesta', 'Non Richiesta'] },
];

const getBadge = (status) => {
  switch (status) {
    case 'Validata':    return <span className="badge success"><CheckCircle size={11}/> Validata</span>;
    case 'In Scadenza': return <span className="badge warning"><AlertTriangle size={11}/> Scadenza</span>;
    case 'Rifiutata':
    case 'Sospesa':     return <span className="badge danger"><XCircle size={11}/> {status}</span>;
    default:            return <span style={{ color: 'var(--outline)', fontSize: 12 }}>—</span>;
  }
};

export default function Omologhe() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title-block">
          <h1 className="text-h1">Omologhe & Accettabilità</h1>
          <p className="page-subtitle">Matrice di compatibilità impianto–CER · Stato autorizzativo</p>
        </div>
        <button className="btn btn-primary"><ShieldCheck size={15}/> Nuova Richiesta</button>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header"><span className="kpi-label">Omologhe Attive</span><div className="kpi-icon"><CheckCircle size={16}/></div></div>
          <div className="kpi-value">145</div>
          <div className="kpi-trend trend-neutral">Su 5 impianti attivi</div>
        </div>
        <div className="kpi-card kpi-warning">
          <div className="kpi-header"><span className="kpi-label">In Scadenza (30gg)</span><div className="kpi-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}><AlertTriangle size={16}/></div></div>
          <div className="kpi-value" style={{ color: 'var(--warning-text)' }}>8</div>
          <div className="kpi-trend trend-down">Azione richiesta</div>
        </div>
        <div className="kpi-card kpi-success">
          <div className="kpi-header"><span className="kpi-label">In Approvazione</span><div className="kpi-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}><ShieldCheck size={16}/></div></div>
          <div className="kpi-value" style={{ color: 'var(--success-text)' }}>3</div>
          <div className="kpi-trend trend-up">Attese entro 15 giorni</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Matrice */}
        <div className="table-container" style={{ overflow: 'auto' }}>
          <div className="table-header">
            <span className="text-h2" style={{ fontSize: 15 }}>Matrice Accettabilità (Impianto × CER)</span>
          </div>
          <table className="data-table" style={{ minWidth: 700 }}>
            <thead>
              <tr>
                <th style={{ width: 200 }}>Impianto</th>
                {cers.map(c => <th key={c} style={{ textAlign: 'center' }}>CER {c}</th>)}
              </tr>
            </thead>
            <tbody>
              {impianti.map((imp, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{imp.nome}</td>
                  {imp.status.map((st, i) => (
                    <td key={i} style={{ textAlign: 'center' }}>{getBadge(st)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ultime caricate */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff' }}>Ultime Omologhe Caricate</span>
          {['EcoCentro Lombardia', 'Nord Inerti Liguria', 'GreenWaste Toscana'].map((name, i) => (
            <div key={i} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="badge success">Approvata</span>
                <span style={{ fontSize: 11, color: '#8BA3D4' }}>Oggi</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 2 }}>{name}</div>
              <div style={{ fontSize: 12, color: '#8BA3D4', marginBottom: 10 }}>CER 17 04 05</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6 }}>
                <FileText size={14} style={{ color: '#f87171', flexShrink: 0 }}/>
                <span style={{ fontSize: 12, color: '#fff', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Analisi_Chimica_V{i + 1}.pdf</span>
                <button className="btn btn-ghost" style={{ padding: '2px 8px', fontSize: 11, color: '#8BA3D4' }}>Vedi</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

