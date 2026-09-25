import { useState } from "react";

interface Props { onLogin: () => void; }

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState("carlos.souza@empresa.com");
  const [senha, setSenha] = useState("senhaSegura123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !senha) { setError("Preencha e-mail e senha."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 900);
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 p-12"
        style={{ background: "var(--card)", borderRight: "1px solid var(--border)" }}>
        <div>
          <div className="flex items-center gap-3 mb-16">
            <span className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-display)" }}>GT</span>
            <span className="text-lg font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>GestãoTreina</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}>
            Gestão de<br />Treinamentos<br />Corporativos
          </h1>
          <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
            Controle completo de NRs, certificados, instrutores e participantes — em conformidade com a legislação vigente.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { label: "Treinamentos ativos", value: "6 programas" },
            { label: "Certificados emitidos", value: "4 em 2026" },
            { label: "Funcionários cadastrados", value: "8 colaboradores" },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-3"
              style={{ borderTop: "1px solid var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{item.label}</span>
              <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden flex items-center gap-3">
            <span className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-display)" }}>GT</span>
            <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>GestãoTreina</span>
          </div>

          <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Entrar no sistema</h2>
          <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
            Use suas credenciais corporativas para acessar.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 uppercase tracking-widest"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded transition-colors outline-none"
                style={{
                  background: "var(--secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-mono)",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--primary)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; }}
                placeholder="usuario@empresa.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 uppercase tracking-widest"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-display)" }}>
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded transition-colors outline-none"
                style={{
                  background: "var(--secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--primary)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-xs py-2 px-3 rounded" style={{ background: "#3f1a1a", color: "#f87171" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded font-semibold text-sm transition-opacity"
              style={{
                background: loading ? "var(--muted)" : "var(--primary)",
                color: loading ? "var(--muted-foreground)" : "var(--primary-foreground)",
                fontFamily: "var(--font-display)",
                fontSize: "15px",
                letterSpacing: "0.02em",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Autenticando..." : "Entrar"}
            </button>
          </form>

          <p className="text-xs mt-6 text-center" style={{ color: "var(--muted-foreground)" }}>
            POST /api/login — token fake de autenticação
          </p>
        </div>
      </div>
    </div>
  );
}
