"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell, Settings, ChevronRight } from 'lucide-react';

const PAGE_NAMES = {
  '/':          'Control Tower',
  '/impianti':  'Anagrafica Impianti',
  '/omologhe':  'Omologhe & Accettabilità',
  '/gare':      'Gare / Opportunità',
  '/proposal':  'Proposal Manager',
  '/sourcing':  'Acquisti / Sourcing',
  '/trading':   'Trading / Cat. 8',
  '/pricebook': 'Pricebook Master',
  '/costi':     'Analisi Costi & Margini',
};

export default function TopHeader() {
  const pathname = usePathname();
  const currentPage = PAGE_NAMES[pathname] || 'Dashboard';
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const dateStr = time ? time.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
  const timeStr = time ? time.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className="top-header">
      <div className="header-breadcrumb">
        <span>Home</span>
        <ChevronRight size={14} />
        <span className="header-breadcrumb-current">{currentPage}</span>
      </div>

      <div className="header-spacer" />

      <div className="search-bar">
        <Search size={14} style={{ color: 'var(--on-surface-variant)', flexShrink: 0 }} />
        <input placeholder="Cerca impianti, CER, gare…" />
      </div>

      <div className="header-status">
        <div className="header-status-dot" />
        Sistema Operativo
      </div>

      <div className="header-time">{dateStr} {dateStr && '—'} {timeStr}</div>

      <button className="icon-btn" title="Impostazioni"><Settings size={18} /></button>
      <button className="icon-btn" title="Notifiche" style={{ position: 'relative' }}>
        <Bell size={18} />
        <span className="notif-badge" />
      </button>
      <div className="header-avatar">EA</div>
    </div>
  );
}
