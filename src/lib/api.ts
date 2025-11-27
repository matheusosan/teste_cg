
// src/lib/api.ts
export type Empresa = {
  codDominio: string
  nomeEmpresa: string
  grupo: string
  cnpjCpf: string
  tributacao: string
}

export type EmpresasResponse = {
  items: Empresa[]
  totalCount: number 
}

export async function getEmpresas({
  page,
  limit,
}: {
  page: number
  limit: number
}): Promise<EmpresasResponse> {
  const allEmpresas: Empresa[] = [
    { codDominio: "001", nomeEmpresa: "Alpha Ltda", grupo: "Grupo A", cnpjCpf: "12.345.678/0001-90", tributacao: "Simples" },
    { codDominio: "002", nomeEmpresa: "Beta SA", grupo: "Grupo B", cnpjCpf: "98.765.432/0001-10", tributacao: "Lucro Presumido" },
    { codDominio: "003", nomeEmpresa: "Gamma ME", grupo: "Grupo A", cnpjCpf: "11.222.333/0001-44", tributacao: "Simples" },
    { codDominio: "004", nomeEmpresa: "Delta EPP", grupo: "Grupo C", cnpjCpf: "22.333.444/0001-55", tributacao: "Lucro Real" },
    { codDominio: "005", nomeEmpresa: "Omega Corp", grupo: "Grupo B", cnpjCpf: "33.444.555/0001-66", tributacao: "Lucro Presumido" },
    { codDominio: "006", nomeEmpresa: "Sigma Ltda", grupo: "Grupo A", cnpjCpf: "44.555.666/0001-77", tributacao: "Simples" },
    { codDominio: "007", nomeEmpresa: "Theta SA", grupo: "Grupo C", cnpjCpf: "55.666.777/0001-88", tributacao: "Lucro Real" },
    { codDominio: "008", nomeEmpresa: "Zeta ME", grupo: "Grupo B", cnpjCpf: "66.777.888/0001-99", tributacao: "Simples" },
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit
      const end = start + limit
      const items = allEmpresas.slice(start, end)
      resolve({ items, totalCount: allEmpresas.length })
    }, 500)
  })
}
