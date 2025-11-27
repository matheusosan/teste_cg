
import { useState } from "react"

export type SortConfig<T> = { key: keyof T; direction: "asc" | "desc" } | null

export function usePagination<T>() {
  const [itemsPerPage, setItemsPerPage] = useState<number>(3)
  const [page, setPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null)

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => (prev?.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }))
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    setSortConfig(null)
  }

  
  const handleItemsPerPageChange = (num: number) => {
    setItemsPerPage(num)
    setPage(1) 
  }

  const getTotalPages = (totalCount: number) => Math.max(1, Math.ceil((totalCount ?? 0) / itemsPerPage))

  const sortItems = (pageItems: T[]) => {
    if (!sortConfig) return pageItems
    const { key, direction } = sortConfig
    return [...pageItems].sort((a, b) => {
      const av = a[key]
      const bv = b[key]
      if (av < bv) return direction === "asc" ? -1 : 1
      if (av > bv) return direction === "asc" ? 1 : -1
      return 0
    })
  }

  return { page, sortConfig, handleSort, handlePageChange, getTotalPages, sortItems, itemsPerPage, setItemsPerPage, handleItemsPerPageChange }
}

