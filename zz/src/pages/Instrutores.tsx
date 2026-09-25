import { useState } from "react";
import { mockInstrutores } from "../data/mockData";

type Instrutor = typeof mockInstrutores[0];

export default function Instrutores() {
  const [lista, setLista] = useState(mockInstrutores);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nome: "", especialidade: "", registro: "", email: "", interno: "true" });

  function handleSave() {
    if (!form.nome) return;
    const novo: Instrutor = { id: Date.now(), ...form, interno: form.interno === "true" };
    setLista(prev => [...prev, novo]);
    setShowForm(false);
    setForm({ nome: "", especialidade: "", registro: "", email: "", interno: "true" });
  }

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Instrutores</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>GET /api/instrutores — {lista.length} registros</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-display)" }}>
          + Novo Instrutor
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lista.map(inst => (
          <div key={inst.id} className="rounded p-5 flex flex-col gap-3"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold text-base" style={{ fontFamily: "var(--font-display)" }}>{inst.nome}</div>
                <div className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>{inst.especialidade}</div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded font-medium"
                style={{
                  background: inst.interno ? "#1a2540" : "#2a2412",
                  color: inst.interno ? "#60a5fa" : "#fbbf24",
                  fontFamily: "var(--font-mono)",
                }}>
                {inst.interno ? "Interno" : "Externo"}
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span style={{ color: "var(--muted-foreground)" }}>Registro:</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>{inst.registro}</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: "var(--muted-foreground)" }}>E-mail:</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{inst.email}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-1" style={{ borderTop: "1px solid var(--border)" }}>
              <button onClick={() => setLista(prev => prev.filter(i => i.id !== inst.id))}
                className="text-xs px-2 py-1 rounded transition-colors"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)"; }}>
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-sm rounded-lg" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>Novo Instrutor</h2>
              <button onClick={() => setShowForm(false)} style={{ color: "var(--muted-foreground)" }}>✕</button>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                { label: "Nome", key: "nome", placeholder: "Nome completo" },
                { label: "Especialidade", key: "especialidade", placeholder: "Segurança do Trabalho" },
                { label: "Registro", key: "registro", placeholder: "CREA-SP-000000" },
                { label: "E-mail", key: "email", placeholder: "instrutor@empresa.com" },
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
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>Tipo</label>
                <select value={form.interno} onChange={e => setForm(prev => ({ ...prev, interno: e.target.value }))}
                  className="w-full px-3 py-2 rounded text-sm outline-none"
                  style={{ background: "var(--secondary)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                  <option value="true">Interno</option>
                  <option value="false">Externo</option>
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
