export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 border rounded-xl disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-sm text-gray-700">
        Page <b>{page}</b> of <b>{pages}</b>
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        className="px-4 py-2 border rounded-xl disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
