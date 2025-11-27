
import { useQuery } from "@tanstack/react-query"
import { getEmpresas, type Empresa } from "@/lib/api"
import { usePagination, type SortConfig } from "@/hooks/usePagination"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react"
import { Paginator } from "./ui/paginator"
import { ItemsPerPageSelect } from "./ItemsPerPageSelect"

function getSortIcon<T>(key: keyof T, sortConfig: SortConfig<T>) {
  if (sortConfig?.key !== key) return <ArrowUpDown className="w-4 h-4" />
  return sortConfig.direction === "asc" ? (
    <ArrowUp className="w-4 h-4" />
  ) : (
    <ArrowDown className="w-4 h-4" />
  )
}

export function SortablePaginatedTable() {
  const { page, sortConfig, handleSort, handlePageChange, getTotalPages, sortItems, itemsPerPage, handleItemsPerPageChange } = usePagination<Empresa>()
  const { data, isFetching, error, isLoading } = useQuery({ 
      queryKey: ["empresas", page, itemsPerPage], 
      queryFn: () => getEmpresas({ page, limit: itemsPerPage }) 
    })

  const totalPages = getTotalPages(data?.totalCount ?? 0)
  const sortedPageItems = sortItems(data?.items ?? [])

  if (error) return <div className="p-4 text-red-600">{(error as Error).message}</div>

  return (
    <div className="w-full space-y-4">
      <ItemsPerPageSelect 
        handleItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => handleSort("codDominio")}>
                {getSortIcon("codDominio", sortConfig)}
              </Button>
              Cód. Domínio
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => handleSort("nomeEmpresa")}>
                {getSortIcon("nomeEmpresa", sortConfig)}
              </Button>
              Nome Empresa
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => handleSort("grupo")}>
                {getSortIcon("grupo", sortConfig)}
              </Button>
              Grupo
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => handleSort("cnpjCpf")}>
                {getSortIcon("cnpjCpf", sortConfig)}
              </Button>
              CNPJ/CPF
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => handleSort("tributacao")}>
                {getSortIcon("tributacao", sortConfig)}
              </Button>
              Tributação
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && !sortedPageItems.length && (
            <TableRow>
              <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                Carregando...
              </TableCell>
            </TableRow>
          )}

          {sortedPageItems.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                Nenhum registro
              </TableCell>
            </TableRow>
          )}

          {sortedPageItems.length > 0 && (
            sortedPageItems.map((e) => (
              <TableRow key={e.codDominio}>
                <TableCell>{e.codDominio}</TableCell>
                <TableCell>{e.nomeEmpresa}</TableCell>
                <TableCell>{e.grupo}</TableCell>
                <TableCell>{e.cnpjCpf}</TableCell>
                <TableCell>{e.tributacao}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Paginator handlePageChange={handlePageChange} isFetching={isFetching} page={page} totalPages={totalPages} />
    </div>
  )
}
