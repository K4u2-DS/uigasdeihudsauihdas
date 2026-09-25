import { mockDashboard, mockTreinamentos, mockCertificados, mockAuditorias } from "../data/mockData";

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  concluido:    { bg: "#0d2b1e", text: "#4ade80", label: "Concluído" },
  em_andamento: { bg: "#1a2540", text: "#60a5fa", label: "Em andamento" },
  pendente:     { bg: "#2a2412", text: "#fbbf24", label: "Pendente" },
  cancelado:    { bg: "#2a1212", text: "#f87171", label: "Cancelado" },
};

function StatusBadge({ status }: { status: string }) {
  const s = statusColors[status] ?? { bg: "var(--muted)", text: "var(--foreground)", label: status };
  return (
    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: s.bg, color: s.text, fontFamily: "var(--font-mono)" }}>
      {s.label}
    </span>
  );
}

export default function Dashboard() {
  const stats = [
    { label: "Funcionários", value: mockDashboard.quantidadeFuncionarios, sub: "cadastrados", color: "var(--primary)" },
    { label: "Treinamentos", value: mockDashboard.quantidadeTreinamentos, sub: "programas", color: "#60a5fa" },
    { label: "Instrutores", value: mockDashboard.quantidadeInstrutores, sub: "ativos", color: "#a78bfa" },
    { label: "Certificados", value: mockDashboard.quantidadeCertificados, sub: "emitidos", color: "#4ade80" },
    { label: "Usuários", value: mockDashboard.quantidadeUsuarios, sub: "do sistema", color: "#fb923c" },
  ];

  const recentes = mockTreinamentos.slice(0, 4);
  const certRecentes = mockCertificados.slice(0, 3);
  const auditRecentes = mockAuditorias.slice(0, 4);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          GET /api/dashboard — Resumo geral do sistema em {new Date().toLocaleDateString("pt-BR")}
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {stats.map(s => (
          <div key={s.label} className="rounded p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: s.color }}>{s.value}</div>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}>{s.label}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {(["concluido", "em_andamento", "pendente", "cancelado"] as const).map(status => {
          const count = mockTreinamentos.filter(t => t.status === status).length;
          const s = statusColors[status];
          return (
            <div key={status} className="rounded p-4 flex items-center gap-3"
              style={{ background: s.bg, border: `1px solid ${s.text}22` }}>
              <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: s.text }}>{count}</div>
              <div className="text-xs font-medium" style={{ color: s.text }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent trainings */}
        <div className="lg:col-span-2 rounded" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <h2 className="text-base font-bold" style={{ fontFamily: "var(--font-display)" }}>Treinamentos Recentes</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>GET /api/treinamentos</p>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {recentes.map(t => (
              <div key={t.id} className="px-5 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{t.titulo}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                    {t.cargaHoraria}h — {new Date(t.dataInicio).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Certificados */}
          <div className="rounded" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <h2 className="text-base font-bold" style={{ fontFamily: "var(--font-display)" }}>Certificados</h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>GET /api/certificados</p>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {certRecentes.map(c => {
                const certStatus = c.status === "valido"
                  ? { color: "#4ade80", label: "Válido" }
                  : c.status === "expirado"
                  ? { color: "#f87171", label: "Expirado" }
                  : { color: "var(--muted-foreground)", label: "Cancelado" };
                return (
                  <div key={c.id} className="px-5 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium" style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>{c.numero}</span>
                      <span className="text-xs font-medium" style={{ color: certStatus.color }}>{certStatus.label}</span>
                    </div>
                    <div className="text-xs mt-0.5 truncate" style={{ color: "var(--muted-foreground)" }}>{c.funcionario}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Auditoria */}
          <div className="rounded" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <h2 className="text-base font-bold" style={{ fontFamily: "var(--font-display)" }}>Log de Auditoria</h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>GET /api/auditorias</p>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {auditRecentes.map(a => (
                <div key={a.id} className="px-5 py-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs px-1.5 py-0.5 rounded font-mono uppercase"
                      style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontSize: "10px" }}>
                      {a.acao}
                    </span>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{a.entidade}</span>
                  </div>
                  <div className="text-xs truncate" style={{ color: "var(--foreground)" }}>{a.detalhe}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
