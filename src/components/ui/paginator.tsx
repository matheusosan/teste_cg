
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface PaginatorProps {
  className?: string
  page: number
  totalPages: number
  isFetching: boolean
  handlePageChange: (newPage: number) => void
}

export const Paginator = ({ className, page, totalPages, isFetching, handlePageChange }: PaginatorProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-2 flex-wrap", className)}>"
      <Button
        onClick={() => handlePageChange(1)}
        disabled={page === 1 || isFetching}
      >
        <ChevronsLeft />
      </Button>

      <Button
        onClick={() => handlePageChange(Math.max(page - 1, 1))}
        disabled={page === 1 || isFetching}
      >
        <ChevronLeft />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          className={`rounded-full ${page === i + 1 ? "bg-[#FBB832] text-black font-bold" : ""}`}
          onClick={() => handlePageChange(i + 1)}
          disabled={isFetching}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages || isFetching}
      >
        <ChevronRight />
      </Button>

      <Button
        onClick={() => handlePageChange(totalPages)}
        disabled={page === totalPages || isFetching}
      >
        <ChevronsRight />
      </Button>
    </div>
  )
}
