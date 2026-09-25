import { useState } from "react";
import { mockUsuarios } from "../data/mockData";

type Usuario = typeof mockUsuarios[0];

export default function Usuarios() {
  const [lista, setLista] = useState(mockUsuarios);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ email: "", funcionarioId: "", perfil: "Operador", ativo: "true" });

  function handleSave() {
    if (!form.email) return;
    const novo: Usuario = {
      id: Date.now(),
      email: form.email,
      funcionarioId: parseInt(form.funcionarioId) || 0,
      ativo: form.ativo === "true",
      criadoEm: new Date().toISOString(),
      perfil: form.perfil,
    };
    setLista(prev => [...prev, novo]);
    setShowForm(false);
    setForm({ email: "", funcionarioId: "", perfil: "Operador", ativo: "true" });
  }

  function toggleAtivo(id: number) {
    setLista(prev => prev.map(u => u.id === id ? { ...u, ativo: !u.ativo } : u));
  }

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Usuários do Sistema</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>GET /api/usuarios — {lista.length} contas</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-display)" }}>
          + Novo Usuário
        </button>
      </div>

      <div className="space-y-2">
        {lista.map(u => (
          <div key={u.id} className="rounded px-5 py-4 flex items-center justify-between gap-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: u.ativo ? "var(--muted)" : "var(--secondary)", color: u.ativo ? "var(--foreground)" : "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>
                {u.email[0].toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-medium" style={{ fontFamily: "var(--font-mono)" }}>{u.email}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{u.perfil}</span>
                  <span className="text-xs" style={{ color: "var(--border)" }}>·</span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    desde {new Date(u.criadoEm).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs px-2 py-0.5 rounded"
                style={{ background: u.ativo ? "#0d2b1e" : "#2a1212", color: u.ativo ? "#4ade80" : "#f87171", fontFamily: "var(--font-mono)" }}>
                {u.ativo ? "Ativo" : "Inativo"}
              </span>
              <button onClick={() => toggleAtivo(u.id)}
                className="text-xs px-2 py-1 rounded transition-colors"
                style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted-foreground)"; }}>
                {u.ativo ? "Desativar" : "Ativar"}
              </button>
              <button onClick={() => setLista(prev => prev.filter(x => x.id !== u.id))}
                className="text-xs px-2 py-1 rounded"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)"; }}>✕</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-sm rounded-lg" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>Novo Usuário</h2>
              <button onClick={() => setShowForm(false)} style={{ color: "var(--muted-foreground)" }}>✕</button>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                { label: "E-mail", key: "email", placeholder: "usuario@empresa.com" },
                { label: "ID do Funcionário", key: "funcionarioId", placeholder: "1" },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs mb-1 uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>{field.label}</label>
                  <input value={(form as Record<string, string>)[field.key]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 rounded text-sm outline-none"
                    style={{ background: "var(--secondary)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
                </div>
              ))}
              <div>
                <label className="block text-xs mb-1 uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>Perfil</label>
                <select value={form.perfil} onChange={e => setForm(prev => ({ ...prev, perfil: e.target.value }))}
                  className="w-full px-3 py-2 rounded text-sm outline-none"
                  style={{ background: "var(--secondary)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                  <option>Administrador</option><option>Gestor RH</option><option>Operador</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-5 pb-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded text-sm"
                style={{ background: "var(--secondary)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>Cancelar</button>
              <button onClick={handleSave} className="flex-1 py-2 rounded text-sm font-semibold"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-display)" }}>
                Criar — POST
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
