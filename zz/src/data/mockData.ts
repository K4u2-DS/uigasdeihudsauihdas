export const mockFuncionarios = [
  { id: 1, nome: "Carlos Souza", matricula: "F001", cargo: "Analista de Qualidade", setor: "Qualidade" },
  { id: 2, nome: "Maria Oliveira", matricula: "F002", cargo: "Técnico de Segurança", setor: "Operações" },
  { id: 3, nome: "João Pedro Lima", matricula: "F003", cargo: "Engenheiro de Produção", setor: "Produção" },
  { id: 4, nome: "Ana Paula Ferreira", matricula: "F004", cargo: "Supervisora de RH", setor: "Recursos Humanos" },
  { id: 5, nome: "Roberto Mendes", matricula: "F005", cargo: "Operador de Máquinas", setor: "Produção" },
  { id: 6, nome: "Fernanda Costa", matricula: "F006", cargo: "Técnica de Laboratório", setor: "Qualidade" },
  { id: 7, nome: "Lucas Martins", matricula: "F007", cargo: "Eletricista Industrial", setor: "Manutenção" },
  { id: 8, nome: "Patrícia Nunes", matricula: "F008", cargo: "Almoxarife", setor: "Logística" },
];

export const mockInstrutores = [
  { id: 1, nome: "Marcos Oliveira", especialidade: "Segurança do Trabalho", registro: "CREA-SP-123456", email: "marcos.oliveira@empresa.com", interno: true },
  { id: 2, nome: "Dra. Silvia Ramos", especialidade: "Medicina do Trabalho", registro: "CRM-SP-98765", email: "silvia.ramos@clinica.com", interno: false },
  { id: 3, nome: "Paulo Henrique", especialidade: "Primeiros Socorros", registro: "CFN-45678", email: "paulo.h@empresa.com", interno: true },
  { id: 4, nome: "Carla Duarte", especialidade: "Combate a Incêndio", registro: "CBMERJ-11234", email: "carla.duarte@bombeiros.gov.br", interno: false },
];

export const mockTreinamentos = [
  { id: 1, titulo: "NR-35 — Trabalho em Altura", descricao: "Treinamento obrigatório conforme Norma Regulamentadora 35. Inclui teoria e prática de uso de EPI.", cargaHoraria: 8, status: "concluido", dataInicio: "2026-03-10T08:00:00.000Z", dataFim: "2026-03-10T17:00:00.000Z" },
  { id: 2, titulo: "NR-10 — Segurança em Instalações Elétricas", descricao: "Habilitação de trabalhadores para atividades em instalações elétricas.", cargaHoraria: 16, status: "em_andamento", dataInicio: "2026-09-20T08:00:00.000Z", dataFim: "2026-09-21T17:00:00.000Z" },
  { id: 3, titulo: "NR-06 — Equipamentos de Proteção Individual", descricao: "Uso correto, guarda e conservação de EPIs.", cargaHoraria: 4, status: "pendente", dataInicio: "2026-10-05T08:00:00.000Z", dataFim: "2026-10-05T12:00:00.000Z" },
  { id: 4, titulo: "CIPA — Brigada de Emergência", descricao: "Formação da Comissão Interna de Prevenção de Acidentes.", cargaHoraria: 20, status: "concluido", dataInicio: "2026-02-01T08:00:00.000Z", dataFim: "2026-02-05T17:00:00.000Z" },
  { id: 5, titulo: "NR-12 — Segurança em Máquinas", descricao: "Proteção de máquinas e equipamentos.", cargaHoraria: 8, status: "cancelado", dataInicio: "2026-08-15T08:00:00.000Z", dataFim: "2026-08-15T17:00:00.000Z" },
  { id: 6, titulo: "NR-33 — Espaço Confinado", descricao: "Trabalho em espaços confinados — medidas de controle e prevenção.", cargaHoraria: 12, status: "pendente", dataInicio: "2026-10-20T08:00:00.000Z", dataFim: "2026-10-20T20:00:00.000Z" },
];

export const mockParticipantes = [
  { id: 1, treinamentoId: 1, funcionarioId: 1, status: "aprovado", inscritoEm: "2026-03-01T09:00:00.000Z" },
  { id: 2, treinamentoId: 1, funcionarioId: 2, status: "aprovado", inscritoEm: "2026-03-01T09:00:00.000Z" },
  { id: 3, treinamentoId: 1, funcionarioId: 3, status: "reprovado", inscritoEm: "2026-03-01T09:00:00.000Z" },
  { id: 4, treinamentoId: 2, funcionarioId: 7, status: "pendente", inscritoEm: "2026-09-15T10:00:00.000Z" },
  { id: 5, treinamentoId: 4, funcionarioId: 4, status: "aprovado", inscritoEm: "2026-01-20T08:00:00.000Z" },
];

export const mockCertificados = [
  { id: 1, treinamentoParticipantesId: 1, numero: "CERT-2026-0001", dataEmissao: "2026-03-11T08:00:00.000Z", dataValidade: "2027-03-11T08:00:00.000Z", status: "valido", funcionario: "Carlos Souza", treinamento: "NR-35 — Trabalho em Altura" },
  { id: 2, treinamentoParticipantesId: 2, numero: "CERT-2026-0002", dataEmissao: "2026-03-11T08:00:00.000Z", dataValidade: "2027-03-11T08:00:00.000Z", status: "valido", funcionario: "Maria Oliveira", treinamento: "NR-35 — Trabalho em Altura" },
  { id: 3, treinamentoParticipantesId: 5, numero: "CERT-2026-0003", dataEmissao: "2026-02-06T08:00:00.000Z", dataValidade: "2025-02-06T08:00:00.000Z", status: "expirado", funcionario: "Ana Paula Ferreira", treinamento: "CIPA — Brigada de Emergência" },
  { id: 4, treinamentoParticipantesId: 3, numero: "CERT-2026-0004", dataEmissao: "2026-04-01T08:00:00.000Z", dataValidade: "2028-04-01T08:00:00.000Z", status: "valido", funcionario: "João Pedro Lima", treinamento: "NR-35 — Trabalho em Altura" },
];

export const mockUsuarios = [
  { id: 1, email: "carlos.souza@empresa.com", funcionarioId: 1, ativo: true, criadoEm: "2026-01-10T08:00:00.000Z", perfil: "Administrador" },
  { id: 2, email: "maria.oliveira@empresa.com", funcionarioId: 2, ativo: true, criadoEm: "2026-01-15T08:00:00.000Z", perfil: "Operador" },
  { id: 3, email: "ana.ferreira@empresa.com", funcionarioId: 4, ativo: true, criadoEm: "2026-02-01T08:00:00.000Z", perfil: "Gestor RH" },
  { id: 4, email: "lucas.martins@empresa.com", funcionarioId: 7, ativo: false, criadoEm: "2026-03-10T08:00:00.000Z", perfil: "Operador" },
];

export const mockAuditorias = [
  { id: 1, entidade: "certificados", entidadeId: 1, acao: "criacao", usuarioId: 1, detalhe: "Certificado CERT-2026-0001 emitido para Carlos Souza (NR-35)", realizadoEm: "2026-03-11T08:01:00.000Z" },
  { id: 2, entidade: "treinamentos", entidadeId: 2, acao: "atualizacao", usuarioId: 1, detalhe: "Status do treinamento NR-10 alterado para em_andamento", realizadoEm: "2026-09-20T08:05:00.000Z" },
  { id: 3, entidade: "funcionarios", entidadeId: 8, acao: "criacao", usuarioId: 3, detalhe: "Funcionário Patrícia Nunes (F008) cadastrado no sistema", realizadoEm: "2026-09-18T14:22:00.000Z" },
  { id: 4, entidade: "certificados", entidadeId: 3, acao: "atualizacao", usuarioId: 1, detalhe: "Certificado CERT-2026-0003 marcado como expirado", realizadoEm: "2026-08-01T09:00:00.000Z" },
  { id: 5, entidade: "usuarios", entidadeId: 4, acao: "atualizacao", usuarioId: 3, detalhe: "Usuário lucas.martins@empresa.com desativado", realizadoEm: "2026-09-10T16:45:00.000Z" },
  { id: 6, entidade: "treinamentos", entidadeId: 5, acao: "atualizacao", usuarioId: 1, detalhe: "Treinamento NR-12 cancelado por indisponibilidade de instrutor", realizadoEm: "2026-08-14T11:30:00.000Z" },
];

export const mockDashboard = {
  quantidadeFuncionarios: 8,
  quantidadeUsuarios: 4,
  quantidadeTreinamentos: 6,
  quantidadeInstrutores: 4,
  quantidadeCertificados: 4,
};
