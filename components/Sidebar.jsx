"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Factory, FileText, ArrowLeftRight, ShoppingCart, BookOpen, ShieldCheck, Trophy, TrendingUp, LogOut } from 'lucide-react';

const NAV_SECTIONS = [
  {
    label: 'Operativo',
    items: [
      { name: 'Control Tower',      path: '/',         icon: LayoutDashboard },
      { name: 'Anagrafica Impianti',path: '/impianti',  icon: Factory },
      { name: 'Omologhe',           path: '/omologhe',  icon: ShieldCheck },
    ]
  },
  {
    label: 'Commerciale',
    items: [
      { name: 'Gare / Opportunità', path: '/gare',      icon: Trophy,          badge: 3 },
      { name: 'Proposal Manager',   path: '/proposal',  icon: FileText },
      { name: 'Acquisti / Sourcing',path: '/sourcing',  icon: ShoppingCart },
    ]
  },
  {
    label: 'Analitico',
    items: [
      { name: 'Trading / Cat. 8',   path: '/trading',  icon: ArrowLeftRight },
      { name: 'Pricebook Master',   path: '/pricebook', icon: BookOpen },
      { name: 'Analisi Costi',      path: '/costi',     icon: TrendingUp },
    ]
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
            <path d="M2 17l10 5 10-5" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
            <path d="M2 12l10 5 10-5" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="sidebar-logo-text">
          <div className="sidebar-logo-title">Elios Ambiente</div>
          <div className="sidebar-logo-sub">Modello Dati Unico</div>
        </div>
      </div>

      <div className="sidebar-nav">
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <div className="sidebar-section-label">{section.label}</div>
            {section.items.map(item => {
              const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-item${isActive ? ' active' : ''}`}
                >
                  <item.icon size={16} />
                  <span style={{ flex: 1 }}>{item.name}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">EA</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">Andrea Addey</div>
          <div className="sidebar-user-role">Supply Chain Manager</div>
        </div>
        <button className="icon-btn" style={{ color: 'rgba(139,163,212,0.6)', padding: '4px' }} title="Logout">
          <LogOut size={15} />
        </button>
      </div>
    </div>
  );
}
