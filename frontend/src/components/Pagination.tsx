interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-pink-50 hover:border-pink-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Previous
      </button>
      <span className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-pink-50 hover:border-pink-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  )
}
