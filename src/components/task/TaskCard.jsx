import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Check,
  Flag,
  Folder,
  Edit2,
  Trash2,
} from 'lucide-react';
import { getRelativeDueDate } from '../../utils/dateUtils';

/**
 * TaskCard component matching the exact design from user photo:
 * - Top: Checkbox circle | Title & Description | Status Pill & Actions (Edit/Delete)
 * - Middle: 3 columns with dividers: PRIORITY | CATEGORY | DUE DATE (with icon boxes & subtexts)
 * - Bottom: Pill tags on left | "Mark as Complete" button on right
 */
export default function TaskCard({
  task,
  onToggleStatus,
  onDelete,
}) {
  const navigate = useNavigate();
  const isCompleted = task.status === 'Completed';

  // Derived or provided tags
  const tags =
    task.tags && task.tags.length > 0
      ? task.tags
      : [task.category, `${task.priority} Priority`];

  const title = task.title || task.description;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/tasks/${task.id}/edit`);
  };

  return (
    <div
      onClick={() => navigate(`/tasks/${task.id}`)}
      className={`bg-white rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between gap-5 shadow-xs cursor-pointer ${
        isCompleted
          ? 'border-[#E2E8F0] bg-[#FAFBFD] opacity-95 hover:border-[#CBD5E1]'
          : 'border-[#E2E8F0] hover:border-[#5865F2]/40 hover:shadow-md'
      }`}
    >
      {/* Top Row: Checkbox Circle | Title & Description | Status Pill & Actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Checkbox Circle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus(task.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer mt-0.5 ${
              isCompleted
                ? 'bg-[#10B981] border-2 border-[#10B981] text-white'
                : 'border-2 border-[#CBD5E1] hover:border-[#4F46E5] bg-white'
            }`}
            title={isCompleted ? 'Mark as Pending' : 'Mark as Complete'}
          >
            {isCompleted && <Check className="w-5 h-5 stroke-[2.5]" />}
          </button>

          {/* Title & Description */}
          <div className="flex-1 min-w-0">
            <Link
              to={`/tasks/${task.id}`}
              className={`text-xl font-bold leading-snug hover:text-[#5865F2] transition-colors block truncate ${
                isCompleted ? 'line-through text-[#64748B]' : 'text-[#0F172A]'
              }`}
              title={title}
            >
              {title}
            </Link>
            <p className="text-sm text-[#64748B] mt-1 leading-relaxed line-clamp-2">
              {task.description}
            </p>
          </div>
        </div>

        {/* Status Pill & Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
              isCompleted
                ? 'bg-[#ECFDF5] text-[#059669]'
                : 'bg-[#EEF2FF] text-[#4F46E5]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isCompleted ? 'bg-[#059669]' : 'bg-[#4F46E5]'
              }`}
            />
            <span>{task.status}</span>
          </div>

          <button
            type="button"
            onClick={handleEdit}
            className="p-1.5 text-[#94A3B8] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors cursor-pointer ml-1"
            title="Edit Task"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="p-1.5 text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors cursor-pointer"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle Row: Stat Blocks with Vertical Dividers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center py-2 divide-y sm:divide-y-0 sm:divide-x divide-[#F1F5F9] gap-3 sm:gap-0">
        {/* Priority Block */}
        <div className="flex items-center gap-3 sm:pr-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              task.priority === 'High'
                ? 'bg-[#FEF2F2] text-[#EF4444]'
                : task.priority === 'Medium'
                ? 'bg-[#FFFBEB] text-[#F59E0B]'
                : 'bg-[#F8FAFC] text-[#64748B]'
            }`}
          >
            <Flag className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-[#94A3B8] tracking-wider uppercase leading-none mb-1">
              PRIORITY
            </span>
            <span
              className={`text-sm font-semibold leading-tight block ${
                task.priority === 'High'
                  ? 'text-[#EF4444]'
                  : task.priority === 'Medium'
                  ? 'text-[#D97706]'
                  : 'text-[#64748B]'
              }`}
            >
              {task.priority}
            </span>
          </div>
        </div>

        {/* Category Block */}
        <div className="flex items-center gap-3 sm:px-3 pt-2 sm:pt-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              task.category === 'Study'
                ? 'bg-[#EFF6FF] text-[#3B82F6]'
                : task.category === 'Work'
                ? 'bg-[#F0FDF4] text-[#10B981]'
                : 'bg-[#FAF5FF] text-[#8B5CF6]'
            }`}
          >
            <Folder className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-[#94A3B8] tracking-wider uppercase leading-none mb-1">
              CATEGORY
            </span>
            <span
              className={`text-sm font-semibold leading-tight block ${
                task.category === 'Study'
                  ? 'text-[#2563EB]'
                  : task.category === 'Work'
                  ? 'text-[#059669]'
                  : 'text-[#7C3AED]'
              }`}
            >
              {task.category}
            </span>
          </div>
        </div>

        {/* Due Date Block */}
        <div className="flex items-center gap-3 sm:pl-3 pt-2 sm:pt-0">
          <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] text-[#64748B] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-[#94A3B8] tracking-wider uppercase leading-none mb-1">
              DUE DATE
            </span>
            <span className="text-sm font-semibold text-[#0F172A] leading-tight block">
              {task.dueDate}
            </span>
            <span className="text-[11px] text-[#94A3B8] leading-tight block mt-0.5">
              {getRelativeDueDate(task.dueDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Tags on Left | Mark as Complete on Right */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#F8FAFC]">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#F8FAFC] text-[#64748B] text-xs font-medium rounded-full border border-[#F1F5F9]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Mark as Complete Button */}
        <button
          type="button"
          onClick={() => onToggleStatus(task.id)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            isCompleted
              ? 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] border border-[#E2E8F0]'
              : 'bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              isCompleted ? 'bg-[#94A3B8] text-white' : 'bg-[#16A34A] text-white'
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{isCompleted ? 'Mark as Pending' : 'Mark as Complete'}</span>
        </button>
      </div>
    </div>
  );
}
