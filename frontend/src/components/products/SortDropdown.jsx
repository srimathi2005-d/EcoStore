import { SORT_OPTIONS } from "../../utils/constants";

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Sort:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border rounded-xl text-sm bg-white"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
