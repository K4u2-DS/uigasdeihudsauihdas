import { useState } from "react";
import { mockFuncionarios } from "../data/mockData";

type Funcionario = typeof mockFuncionarios[0];

export default function Funcionarios() {
  const [lista, setLista] = useState(mockFuncionarios);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Funcionario | null>(null);
  const [form, setForm] = useState({ nome: "", matricula: "", cargo: "", setor: "" });

  const filtered = lista.filter(f =>
    f.nome.toLowerCase().includes(search.toLowerCase()) ||
    f.cargo.toLowerCase().includes(search.toLowerCase()) ||
    f.setor.toLowerCase().includes(search.toLowerCase())
  );

  function openNew() {
    setEditing(null);
    setForm({ nome: "", matricula: "", cargo: "", setor: "" });
    setShowForm(true);
  }

  function openEdit(f: Funcionario) {
    setEditing(f);
    setForm({ nome: f.nome, matricula: f.matricula, cargo: f.cargo, setor: f.setor });
    setShowForm(true);
  }

  function handleSave() {
    if (!form.nome) return;
    if (editing) {
      setLista(prev => prev.map(f => f.id === editing.id ? { ...f, ...form } : f));
    } else {
      const next: Funcionario = { id: Date.now(), ...form };
      setLista(prev => [...prev, next]);
    }
    setShowForm(false);
  }

  function handleDelete(id: number) {
    setLista(prev => prev.filter(f => f.id !== id));
  }

  const setores = [...new Set(lista.map(f => f.setor))];

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Funcionários</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>GET /api/funcionarios — {lista.length} registros</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-display)" }}>
          + Novo Funcionário
        </button>
      </div>

      {/* Setor breakdown */}
      <div className="flex flex-wrap gap-2 mb-4">
        {setores.map(s => {
          const count = lista.filter(f => f.setor === s).length;
          return (
            <span key={s} className="text-xs px-2.5 py-1 rounded font-medium"
              style={{ background: "var(--secondary)", color: "var(--muted-foreground)", border: "1px solid var(--border)", fontFamily: "var(--font-display)" }}>
              {s} <span style={{ color: "var(--primary)" }}>{count}</span>
            </span>
          );
        })}
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Buscar por nome, cargo ou setor..."
        className="w-full px-3 py-2 rounded text-sm outline-none mb-4 transition-colors"
        style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
        onFocus={e => { e.currentTarget.style.borderColor = "var(--primary)"; }}
        onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; }} />

      <div className="rounded overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--secondary)", borderBottom: "1px solid var(--border)" }}>
              {["Matrícula", "Nome", "Cargo", "Setor", ""].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => (
              <tr key={f.id} style={{ background: i % 2 === 0 ? "var(--card)" : "var(--secondary)", borderBottom: "1px solid var(--border)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--muted)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? "var(--card)" : "var(--secondary)"; }}>
                <td className="px-4 py-3" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--primary)" }}>{f.matricula}</td>
                <td className="px-4 py-3 font-medium">{f.nome}</td>
                <td className="px-4 py-3 hidden md:table-cell" style={{ color: "var(--muted-foreground)" }}>{f.cargo}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--muted)", color: "var(--foreground)" }}>{f.setor}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => openEdit(f)} className="text-xs px-2 py-1 rounded transition-colors"
                      style={{ color: "var(--muted-foreground)", border: "1px solid var(--border)" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted-foreground)"; }}>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(f.id)} className="text-xs px-2 py-1 rounded transition-colors"
                      style={{ color: "var(--muted-foreground)" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)"; }}>
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-sm" style={{ color: "var(--muted-foreground)", background: "var(--card)" }}>Nenhum funcionário encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-sm rounded-lg" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                {editing ? "Editar Funcionário" : "Novo Funcionário"}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ color: "var(--muted-foreground)" }}>✕</button>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                { label: "Nome", key: "nome", placeholder: "Nome completo" },
                { label: "Matrícula", key: "matricula", placeholder: "F009" },
                { label: "Cargo", key: "cargo", placeholder: "Analista de..." },
                { label: "Setor", key: "setor", placeholder: "Qualidade, Produção..." },
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
            </div>
            <div className="flex gap-3 px-5 pb-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded text-sm"
                style={{ background: "var(--secondary)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
                Cancelar
              </button>
              <button onClick={handleSave} className="flex-1 py-2 rounded text-sm font-semibold"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-display)" }}>
                {editing ? "Salvar — PUT" : "Criar — POST"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
