import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "../pages/Dashboard";
import Treinamentos from "../pages/Treinamentos";
import Funcionarios from "../pages/Funcionarios";
import Instrutores from "../pages/Instrutores";
import Certificados from "../pages/Certificados";
import Usuarios from "../pages/Usuarios";
import Auditorias from "../pages/Auditorias";

export type Page = "dashboard" | "treinamentos" | "funcionarios" | "instrutores" | "certificados" | "usuarios" | "auditorias";

interface Props {
  user: { nome: string; email: string; perfil: string };
  onLogout: () => void;
}

export default function Shell({ user, onLogout }: Props) {
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages: Record<Page, React.ReactNode> = {
    dashboard: <Dashboard />,
    treinamentos: <Treinamentos />,
    funcionarios: <Funcionarios />,
    instrutores: <Instrutores />,
    certificados: <Certificados />,
    usuarios: <Usuarios />,
    auditorias: <Auditorias />,
  };

  return (
    <div className="flex min-h-screen" style={{ background: "var(--background)" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        current={page}
        onNavigate={(p) => { setPage(p); setSidebarOpen(false); }}
        user={user}
        onLogout={onLogout}
        mobileOpen={sidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="flex items-center gap-3 px-4 py-3 lg:hidden"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--card)" }}>
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded" style={{ color: "var(--muted-foreground)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span className="font-semibold text-sm" style={{ fontFamily: "var(--font-display)" }}>GestãoTreina</span>
        </div>

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {pages[page]}
        </main>
      </div>
    </div>
  );
}
