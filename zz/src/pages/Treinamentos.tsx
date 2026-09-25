import { useState } from "react";
import { mockTreinamentos, mockParticipantes, mockFuncionarios, mockInstrutores } from "../data/mockData";

type Status = "todos" | "pendente" | "em_andamento" | "concluido" | "cancelado";

const statusMeta: Record<string, { bg: string; text: string; label: string }> = {
  concluido:    { bg: "#0d2b1e", text: "#4ade80", label: "Concluído" },
  em_andamento: { bg: "#1a2540", text: "#60a5fa", label: "Em andamento" },
  pendente:     { bg: "#2a2412", text: "#fbbf24", label: "Pendente" },
  cancelado:    { bg: "#2a1212", text: "#f87171", label: "Cancelado" },
};

function StatusBadge({ status }: { status: string }) {
  const s = statusMeta[status] ?? { bg: "var(--muted)", text: "var(--foreground)", label: status };
  return (
    <span className="text-xs px-2 py-0.5 rounded font-medium whitespace-nowrap"
      style={{ background: s.bg, color: s.text, fontFamily: "var(--font-mono)" }}>
      {s.label}
    </span>
  );
}

type Treinamento = typeof mockTreinamentos[0];

export default function Treinamentos() {
  const [filter, setFilter] = useState<Status>("todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Treinamento | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [treinamentos, setTreinamentos] = useState(mockTreinamentos);

  const [form, setForm] = useState({ titulo: "", descricao: "", cargaHoraria: "", status: "pendente", dataInicio: "", dataFim: "" });

  const filtered = treinamentos.filter(t =>
    (filter === "todos" || t.status === filter) &&
    (t.titulo.toLowerCase().includes(search.toLowerCase()) || t.descricao.toLowerCase().includes(search.toLowerCase()))
  );

  function handleAdd() {
    if (!form.titulo) return;
    const newT: Treinamento = {
      id: Date.now(),
      titulo: form.titulo,
      descricao: form.descricao,
      cargaHoraria: parseInt(form.cargaHoraria) || 8,
      status: form.status,
      dataInicio: form.dataInicio ? new Date(form.dataInicio).toISOString() : new Date().toISOString(),
      dataFim: form.dataFim ? new Date(form.dataFim).toISOString() : new Date().toISOString(),
    };
    setTreinamentos(prev => [newT, ...prev]);
    setShowForm(false);
    setForm({ titulo: "", descricao: "", cargaHoraria: "", status: "pendente", dataInicio: "", dataFim: "" });
  }

  function handleDelete(id: number) {
    setTreinamentos(prev => prev.filter(t => t.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  const participantesDo = selected
    ? mockParticipantes.filter(p => p.treinamentoId === selected.id).map(p => ({
        ...p,
        funcionario: mockFuncionarios.find(f => f.id === p.funcionarioId),
      }))
    : [];

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Treinamentos</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>GET /api/treinamentos — {treinamentos.length} registros</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-opacity"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-display)" }}>
          <span>+</span> Novo Treinamento
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar treinamento..."
          className="flex-1 px-3 py-2 rounded text-sm outline-none transition-colors"
          style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          onFocus={e => { e.currentTarget.style.borderColor = "var(--primary)"; }}
          onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; }}
        />
        <div className="flex gap-1 flex-wrap">
          {(["todos", "pendente", "em_andamento", "concluido", "cancelado"] as Status[]).map(s => (
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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className={`${selected ? "lg:col-span-3" : "lg:col-span-5"}`}>
          <div className="rounded overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--secondary)", borderBottom: "1px solid var(--border)" }}>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>Título</th>
                  {!selected && <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell"
                    style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>Data Início</th>}
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden sm:table-cell"
                    style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>CH</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={t.id}
                    className="cursor-pointer transition-colors"
                    style={{
                      background: selected?.id === t.id ? "var(--muted)" : i % 2 === 0 ? "var(--card)" : "var(--secondary)",
                      borderBottom: "1px solid var(--border)",
                    }}
                    onClick={() => setSelected(selected?.id === t.id ? null : t)}
                    onMouseEnter={e => { if (selected?.id !== t.id) e.currentTarget.style.background = "var(--muted)"; }}
                    onMouseLeave={e => { if (selected?.id !== t.id) e.currentTarget.style.background = i % 2 === 0 ? "var(--card)" : "var(--secondary)"; }}
                  >
                    <td className="px-4 py-3 font-medium max-w-[200px]">
                      <div className="truncate">{t.titulo}</div>
                    </td>
                    {!selected && <td className="px-4 py-3 hidden md:table-cell" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                      {new Date(t.dataInicio).toLocaleDateString("pt-BR")}
                    </td>}
                    <td className="px-4 py-3 hidden sm:table-cell" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>{t.cargaHoraria}h</td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-4 py-3">
                      <button onClick={e => { e.stopPropagation(); handleDelete(t.id); }}
                        className="text-xs px-2 py-1 rounded transition-colors"
                        style={{ color: "var(--muted-foreground)" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)"; }}>
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-sm" style={{ color: "var(--muted-foreground)", background: "var(--card)" }}>Nenhum treinamento encontrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="lg:col-span-2 rounded" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="px-5 py-4 flex items-start justify-between gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <div>
                <h2 className="text-lg font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>{selected.titulo}</h2>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>GET /api/treinamentos/{selected.id}/completo</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: "var(--muted-foreground)" }}>✕</button>
            </div>
            <div className="px-5 py-4 space-y-4">
              <StatusBadge status={selected.status} />
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{selected.descricao}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span style={{ color: "var(--muted-foreground)" }}>Carga horária</span><div className="font-bold mt-0.5" style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>{selected.cargaHoraria}h</div></div>
                <div><span style={{ color: "var(--muted-foreground)" }}>Início</span><div className="font-mono mt-0.5">{new Date(selected.dataInicio).toLocaleDateString("pt-BR")}</div></div>
                <div><span style={{ color: "var(--muted-foreground)" }}>Fim</span><div className="font-mono mt-0.5">{new Date(selected.dataFim).toLocaleDateString("pt-BR")}</div></div>
                <div><span style={{ color: "var(--muted-foreground)" }}>Instrutores</span><div className="font-mono mt-0.5">{mockInstrutores[0].nome}</div></div>
              </div>

              {participantesDo.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>
                    Participantes ({participantesDo.length})
                  </div>
                  <div className="space-y-2">
                    {participantesDo.map(p => {
                      const ps = p.status === "aprovado" ? "#4ade80" : p.status === "reprovado" ? "#f87171" : "#fbbf24";
                      return (
                        <div key={p.id} className="flex items-center justify-between text-xs p-2 rounded"
                          style={{ background: "var(--secondary)" }}>
                          <span>{p.funcionario?.nome ?? `Funcionário #${p.funcionarioId}`}</span>
                          <span style={{ color: ps, fontFamily: "var(--font-mono)" }}>{p.status}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-md rounded-lg" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>Novo Treinamento</h2>
              <button onClick={() => setShowForm(false)} style={{ color: "var(--muted-foreground)" }}>✕</button>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                { label: "Título", key: "titulo", type: "text", placeholder: "NR-XX — Descrição" },
                { label: "Descrição", key: "descricao", type: "text", placeholder: "Detalhes do treinamento" },
                { label: "Carga horária (h)", key: "cargaHoraria", type: "number", placeholder: "8" },
                { label: "Data início", key: "dataInicio", type: "date", placeholder: "" },
                { label: "Data fim", key: "dataFim", type: "date", placeholder: "" },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs mb-1 uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>{field.label}</label>
                  <input type={field.type} value={(form as Record<string, string>)[field.key]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 rounded text-sm outline-none"
                    style={{ background: "var(--secondary)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
                </div>
              ))}
              <div>
                <label className="block text-xs mb-1 uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>Status</label>
                <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 rounded text-sm outline-none"
                  style={{ background: "var(--secondary)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                  <option value="pendente">Pendente</option>
                  <option value="em_andamento">Em andamento</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-5 pb-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded text-sm"
                style={{ background: "var(--secondary)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
                Cancelar
              </button>
              <button onClick={handleAdd} className="flex-1 py-2 rounded text-sm font-semibold"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-display)" }}>
                Criar — POST /api/treinamentos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
