import { useState } from "react";
import { mockCertificados } from "../data/mockData";

const statusMeta: Record<string, { bg: string; text: string; label: string }> = {
  valido:    { bg: "#0d2b1e", text: "#4ade80", label: "Válido" },
  expirado:  { bg: "#2a1212", text: "#f87171", label: "Expirado" },
  cancelado: { bg: "#2a2412", text: "#9ca3af", label: "Cancelado" },
};

type Cert = typeof mockCertificados[0];

export default function Certificados() {
  const [lista, setLista] = useState(mockCertificados);
  const [filter, setFilter] = useState<"todos" | "valido" | "expirado" | "cancelado">("todos");
  const [search, setSearch] = useState("");

  const filtered = lista.filter(c =>
    (filter === "todos" || c.status === filter) &&
    (c.numero.toLowerCase().includes(search.toLowerCase()) ||
     c.funcionario.toLowerCase().includes(search.toLowerCase()) ||
     c.treinamento.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Certificados</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>GET /api/certificados — {lista.length} registros</p>
        </div>
        <div className="flex gap-2">
          {(["valido", "expirado", "cancelado"] as const).map(s => {
            const count = lista.filter(c => c.status === s).length;
            const m = statusMeta[s];
            return (
              <span key={s} className="text-xs px-2.5 py-1 rounded"
                style={{ background: m.bg, color: m.text, fontFamily: "var(--font-display)", fontWeight: 600 }}>
                {count} {m.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por número, funcionário ou treinamento..."
          className="flex-1 px-3 py-2 rounded text-sm outline-none transition-colors"
          style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          onFocus={e => { e.currentTarget.style.borderColor = "var(--primary)"; }}
          onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; }} />
        <div className="flex gap-1">
          {(["todos", "valido", "expirado", "cancelado"] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className="px-3 py-2 rounded text-xs font-semibold transition-colors"
              style={{
                background: filter === s ? "var(--primary)" : "var(--card)",
                color: filter === s ? "var(--primary-foreground)" : "var(--muted-foreground)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-display)",
              }}>
              {s === "todos" ? "Todos" : statusMeta[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--secondary)", borderBottom: "1px solid var(--border)" }}>
              {["Número", "Funcionário", "Treinamento", "Emissão", "Validade", "Status", ""].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}
                  hidden={h === "Treinamento" ? false : false}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const m = statusMeta[c.status];
              return (
                <tr key={c.id} style={{ background: i % 2 === 0 ? "var(--card)" : "var(--secondary)", borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--muted)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? "var(--card)" : "var(--secondary)"; }}>
                  <td className="px-4 py-3" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--primary)" }}>{c.numero}</td>
                  <td className="px-4 py-3 font-medium">{c.funcionario}</td>
                  <td className="px-4 py-3 hidden md:table-cell" style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>{c.treinamento}</td>
                  <td className="px-4 py-3 hidden sm:table-cell" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted-foreground)" }}>
                    {new Date(c.dataEmissao).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted-foreground)" }}>
                    {new Date(c.dataValidade).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ background: m.bg, color: m.text, fontFamily: "var(--font-mono)" }}>{m.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setLista(prev => prev.filter(cert => cert.id !== c.id))}
                      className="text-xs px-2 py-1 rounded"
                      style={{ color: "var(--muted-foreground)" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)"; }}>✕</button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-sm" style={{ color: "var(--muted-foreground)", background: "var(--card)" }}>Nenhum certificado encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
