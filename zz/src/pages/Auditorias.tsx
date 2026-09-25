import { useState } from "react";
import { mockAuditorias } from "../data/mockData";

const acaoMeta: Record<string, { bg: string; text: string }> = {
  criacao:     { bg: "#0d2b1e", text: "#4ade80" },
  atualizacao: { bg: "#1a2540", text: "#60a5fa" },
  exclusao:    { bg: "#2a1212", text: "#f87171" },
};

export default function Auditorias() {
  const [search, setSearch] = useState("");
  const [entidade, setEntidade] = useState("todas");

  const entidades = ["todas", ...new Set(mockAuditorias.map(a => a.entidade))];

  const filtered = mockAuditorias.filter(a =>
    (entidade === "todas" || a.entidade === entidade) &&
    (a.detalhe.toLowerCase().includes(search.toLowerCase()) ||
     a.entidade.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Log de Auditoria</h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          GET /api/auditorias — Rastreabilidade de todas as operações do sistema
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar no log..."
          className="flex-1 px-3 py-2 rounded text-sm outline-none transition-colors"
          style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          onFocus={e => { e.currentTarget.style.borderColor = "var(--primary)"; }}
          onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; }} />
        <div className="flex gap-1 flex-wrap">
          {entidades.map(e => (
            <button key={e} onClick={() => setEntidade(e)}
              className="px-3 py-2 rounded text-xs font-semibold capitalize transition-colors"
              style={{
                background: entidade === e ? "var(--primary)" : "var(--card)",
                color: entidade === e ? "var(--primary-foreground)" : "var(--muted-foreground)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-display)",
              }}>
              {e === "todas" ? "Todas" : e}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(a => {
          const meta = acaoMeta[a.acao] ?? { bg: "var(--muted)", text: "var(--foreground)" };
          return (
            <div key={a.id} className="rounded px-5 py-4 flex items-start gap-4"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="shrink-0 mt-0.5">
                <span className="text-xs px-2 py-1 rounded font-semibold uppercase tracking-wide block"
                  style={{ background: meta.bg, color: meta.text, fontFamily: "var(--font-mono)" }}>
                  {a.acao}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>
                    {a.entidade} #{a.entidadeId}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>
                    {new Date(a.realizadoEm).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="text-sm mt-1">{a.detalhe}</div>
                <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                  Usuário ID: <span style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>{a.usuarioId}</span>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm" style={{ color: "var(--muted-foreground)" }}>
            Nenhum registro de auditoria encontrado.
          </div>
        )}
      </div>
    </div>
  );
}
