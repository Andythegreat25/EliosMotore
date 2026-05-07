"use client";
import { useState } from 'react';
import { Factory, Search, XCircle, FileText, CheckCircle, MapPin, ChevronRight } from 'lucide-react';

const impianti = [
  { id: 'IMP-001', nome: 'EcoCentro Lombardia SpA',      regione: 'Lombardia',  tipo: 'Recupero', status: 'Operativo',  capacitaResidua: '45000', autorizzazioni: 3, omologhe: 18 },
  { id: 'IMP-002', nome: 'Discarica Val d\'Adige',        regione: 'Trentino',   tipo: 'Discarica',status: 'Operativo',  capacitaResidua: '82000', autorizzazioni: 2, omologhe: 12 },
  { id: 'IMP-003', nome: 'MetalRecuperi Srl',              regione: 'Veneto',     tipo: 'Recupero', status: 'Attenzione', capacitaResidua: '8000',  autorizzazioni: 1, omologhe: 7 },
  { id: 'IMP-004', nome: 'Inerti Piemonte SpA',            regione: 'Piemonte',   tipo: 'Inerti',   status: 'Bloccato',  capacitaResidua: '0',     autorizzazioni: 0, omologhe: 4 },
  { id: 'IMP-005', nome: 'Recuperi Sud Srl',               regione: 'Campania',   tipo: 'Recupero', status: 'Operativo',  capacitaResidua: '31000', autorizzazioni: 3, omologhe: 9 },
  { id: 'IMP-006', nome: 'GreenWaste Toscana',             regione: 'Toscana',    tipo: 'Recupero', status: 'Operativo',  capacitaResidua: '22000', autorizzazioni: 2, omologhe: 11 },
  { id: 'IMP-007', nome: 'Eco Lazio Srl',                  regione: 'Lazio',      tipo: 'Discarica',status: 'Attenzione', capacitaResidua: '9500',  autorizzazioni: 2, omologhe: 6 },
  { id: 'IMP-008', nome: 'Nord Inerti Liguria',            regione: 'Liguria',    tipo: 'Inerti',   status: 'Operativo',  capacitaResidua: '55000', autorizzazioni: 3, omologhe: 14 },
];

export default function ImpiantiMaster() {
  const [sel, setSel] = useState(null);
  const [q, setQ] = useState('');
  const filtered = impianti.filter(i =>
    i.nome.toLowerCase().includes(q.toLowerCase()) ||
    i.regione.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-title-block">
          <h1 className="text-h1">Anagrafica Impianti</h1>
          <p className="page-subtitle">{impianti.length} impianti censiti · Seleziona per dettaglio rapido</p>
        </div>
        <button className="btn btn-primary"><Factory size={15}/> Nuovo Impianto</button>
      </div>

      <div style={{ display: 'flex', gap: 20, height: 'calc(100vh - 200px)', overflow: 'hidden' }}>
        {/* Table */}
        <div className="table-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div className="table-header">
            <span className="text-h2" style={{ fontSize: 15 }}>Lista Impianti</span>
            <div className="search-bar" style={{ width: 240 }}>
              <Search size={13} style={{ color: 'var(--on-surface-variant)', flexShrink: 0 }}/>
              <input placeholder="Cerca…" value={q} onChange={e => setQ(e.target.value)}/>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table className="data-table">
              <thead style={{ position: 'sticky', top: 0, zIndex: 5 }}>
                <tr>
                  <th>Impianto</th><th>Regione</th><th>Tipo</th>
                  <th style={{ textAlign: 'right' }}>Cap. Residua (T)</th>
                  <th style={{ textAlign: 'center' }}>Stato</th><th/>
                </tr>
              </thead>
              <tbody>
                {filtered.map(imp => (
                  <tr key={imp.id}
                    onClick={() => setSel(imp)}
                    style={{ cursor: 'pointer', background: sel?.id === imp.id ? 'var(--electric-dim)' : undefined }}
                  >
                    <td>
                      <div style={{ fontWeight: 600 }}>{imp.nome}</div>
                      <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>{imp.id}</div>
                    </td>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={12} style={{ color: 'var(--on-surface-variant)' }}/>{imp.regione}</div></td>
                    <td><span className="badge neutral">{imp.tipo}</span></td>
                    <td style={{ textAlign: 'right', fontWeight: 600, color: parseInt(imp.capacitaResidua) > 10000 ? 'var(--success-text)' : parseInt(imp.capacitaResidua) > 0 ? 'var(--warning-text)' : 'var(--danger-text)' }}>
                      {parseInt(imp.capacitaResidua).toLocaleString() || '—'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge ${imp.status === 'Operativo' ? 'success' : imp.status === 'Attenzione' ? 'warning' : 'danger'}`}>{imp.status}</span>
                    </td>
                    <td><ChevronRight size={16} style={{ color: 'var(--on-surface-variant)' }}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel */}
        {sel && (
          <div className="card-dark" style={{ width: 360, flexShrink: 0, display: 'flex', flexDirection: 'column', overflowY: 'auto', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className={`badge ${sel.status === 'Operativo' ? 'success' : sel.status === 'Attenzione' ? 'warning' : 'danger'}`} style={{ marginBottom: 8 }}>{sel.status}</span>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#fff', marginTop: 6 }}>{sel.nome}</div>
                <div style={{ fontSize: 12, color: '#8BA3D4', marginTop: 3 }}>{sel.regione} · {sel.id}</div>
              </div>
              <button className="icon-btn" style={{ color: '#8BA3D4' }} onClick={() => setSel(null)}><XCircle size={18}/></button>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#8BA3D4', marginBottom: 10 }}>Capacità & Operatività</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Capacità Tot.', val: '150.000 T', color: '#fff' },
                  { label: 'Residua', val: `${parseInt(sel.capacitaResidua).toLocaleString()} T`, color: '#6B96FF' },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 11, color: '#8BA3D4', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: s.color }}>{s.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#8BA3D4', marginBottom: 10 }}>Compliance</div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                {[
                  { icon: FileText, label: 'Autorizzazioni AIA/AUA', val: `${sel.autorizzazioni} Attive` },
                  { icon: CheckCircle, label: 'Omologhe Validate', val: `${sel.omologhe} Totali` },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.08)' : undefined }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <r.icon size={14} style={{ color: '#6B96FF' }}/>
                      <span style={{ fontSize: 13, color: '#fff' }}>{r.label}</span>
                    </div>
                    <span className="badge info">{r.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-outline" style={{ width: '100%', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              Apri Scheda Completa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

