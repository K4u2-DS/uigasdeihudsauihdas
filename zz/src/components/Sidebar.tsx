import type { Page } from "./Shell";

interface NavItem { id: Page; label: string; icon: React.ReactNode; }

const nav: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <GridIcon /> },
  { id: "treinamentos", label: "Treinamentos", icon: <BookIcon /> },
  { id: "funcionarios", label: "Funcionários", icon: <UsersIcon /> },
  { id: "instrutores", label: "Instrutores", icon: <StarIcon /> },
  { id: "certificados", label: "Certificados", icon: <CertIcon /> },
  { id: "usuarios", label: "Usuários", icon: <UserIcon /> },
  { id: "auditorias", label: "Auditorias", icon: <LogIcon /> },
];

interface Props {
  current: Page;
  onNavigate: (p: Page) => void;
  user: { nome: string; email: string; perfil: string };
  onLogout: () => void;
  mobileOpen: boolean;
}

export default function Sidebar({ current, onNavigate, user, onLogout, mobileOpen }: Props) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 w-60 flex flex-col transition-transform duration-200
        lg:relative lg:translate-x-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      style={{ background: "var(--card)", borderRight: "1px solid var(--border)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-display)" }}>
          GT
        </span>
        <div>
          <div className="text-sm font-bold leading-none" style={{ fontFamily: "var(--font-display)" }}>GestãoTreina</div>
          <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>v1.0.0</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-widest px-2 mb-3"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>
          Módulos
        </p>
        {nav.map(item => {
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors text-left"
              style={{
                background: active ? "var(--primary)" : "transparent",
                color: active ? "var(--primary-foreground)" : "var(--muted-foreground)",
                fontFamily: active ? "var(--font-display)" : "inherit",
                fontWeight: active ? 600 : 400,
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--muted)"; e.currentTarget.style.color = "var(--foreground)"; }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted-foreground)"; } }}
            >
              <span className="shrink-0 opacity-80">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 pb-4" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-3 p-3 rounded mt-3"
          style={{ background: "var(--secondary)" }}>
          <div className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: "var(--muted)", color: "var(--foreground)", fontFamily: "var(--font-display)" }}>
            {user.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate" style={{ fontFamily: "var(--font-display)" }}>{user.nome}</div>
            <div className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>{user.perfil}</div>
          </div>
          <button onClick={onLogout} title="Sair" className="shrink-0 p-1 rounded transition-colors"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)"; }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

function GridIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function BookIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>; }
function UsersIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>; }
function StarIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function CertIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>; }
function UserIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function LogIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>; }
