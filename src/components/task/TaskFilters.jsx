import { PRIORITIES, CATEGORIES } from '../../data/tasks';
import { Filter, RotateCcw } from 'lucide-react';

/**
 * TaskFilters component for filtering tasks by Priority and Category
 */
export default function TaskFilters({
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  totalResults,
}) {
  const isFiltered = priorityFilter !== 'All' || categoryFilter !== 'All';

  const resetFilters = () => {
    setPriorityFilter('All');
    setCategoryFilter('All');
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] mb-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3.5 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2 text-sm font-medium text-[#17202A]">
          <Filter className="w-4 h-4 text-[#5865F2]" />
          <span>Filters</span>
          {typeof totalResults === 'number' && (
            <span className="text-xs text-[#667085] font-normal">
              ({totalResults} {totalResults === 1 ? 'task' : 'tasks'} found)
            </span>
          )}
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5865F2] hover:text-[#4752C4] cursor-pointer self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
        {/* Priority Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-medium text-[#667085] min-w-[55px]">Priority:</span>
          <div className="flex flex-wrap gap-1.5">
            {['All', ...PRIORITIES].map((p) => {
              const active = priorityFilter === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriorityFilter(p)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer border ${
                    active
                      ? 'bg-[#EEF0FF] text-[#5865F2] border-[#5865F2]'
                      : 'bg-white text-[#667085] border-[#E5E7EB] hover:bg-[#F2F4F7] hover:text-[#17202A]'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-medium text-[#667085] min-w-[65px]">Category:</span>
          <div className="flex flex-wrap gap-1.5">
            {['All', ...CATEGORIES].map((c) => {
              const active = categoryFilter === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategoryFilter(c)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer border ${
                    active
                      ? 'bg-[#EEF0FF] text-[#5865F2] border-[#5865F2]'
                      : 'bg-white text-[#667085] border-[#E5E7EB] hover:bg-[#F2F4F7] hover:text-[#17202A]'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
