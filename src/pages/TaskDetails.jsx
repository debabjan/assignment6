import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Check,
  Flag,
  Folder,
  Edit2,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { getRelativeDueDate } from '../utils/dateUtils';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';

/**
 * TaskDetails Page (/tasks/:taskId)
 * Demonstrates React Router Dynamic Routing and useParams() hook
 * Upgraded to match the premium card design language
 */
export default function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTaskById, toggleTaskStatus, deleteTask } = useTasks();

  const task = getTaskById(taskId);

  // If task ID does not exist, render a clean not-found state
  if (!task) {
    return (
      <div className="py-10 max-w-2xl mx-auto">
        <EmptyState
          icon={AlertCircle}
          title="Task not found."
          description={`We could not locate any task with ID #${taskId}. It may have been removed or the URL is incorrect.`}
          action={
            <Button
              variant="primary"
              icon={ArrowLeft}
              onClick={() => navigate('/tasks')}
            >
              Return to Tasks
            </Button>
          }
        />
      </div>
    );
  }

  const isCompleted = task.status === 'Completed';
  const title = task.title || task.description;
  const tags =
    task.tags && task.tags.length > 0
      ? task.tags
      : [task.category, `${task.priority} Priority`];

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      navigate('/tasks');
    }
  };

  const handleToggle = () => {
    toggleTaskStatus(task.id);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back button and URL Parameter indicator */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/tasks')}
        >
          Back to Tasks
        </Button>

        {/* Dynamic Route URL parameter badge */}
        <span className="text-xs font-mono bg-white text-[#64748B] px-3 py-1 rounded-full border border-[#E2E8F0] shadow-2xs">
          Route Param: taskId = {taskId}
        </span>
      </div>

      {/* Main Details Card (Styled matching TaskCard) */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Top Row: Checkbox Circle | Title & Description | Status Pill */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Checkbox Circle */}
            <button
              type="button"
              onClick={handleToggle}
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer mt-0.5 ${
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
              <h2
                className={`text-2xl sm:text-3xl font-bold leading-tight ${
                  isCompleted ? 'line-through text-[#64748B]' : 'text-[#0F172A]'
                }`}
              >
                {title}
              </h2>
              {task.description && (
                <p className="text-sm sm:text-base text-[#64748B] mt-2 leading-relaxed">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          {/* Status Pill */}
          <div
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 ${
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
        </div>

        {/* Middle Row: Stat Blocks with Vertical Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center py-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F1F5F9] border-y border-[#F1F5F9] gap-4 sm:gap-0">
          {/* Priority Block */}
          <div className="flex items-center gap-3 sm:pr-4">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                task.priority === 'High'
                  ? 'bg-[#FEF2F2] text-[#EF4444]'
                  : task.priority === 'Medium'
                  ? 'bg-[#FFFBEB] text-[#F59E0B]'
                  : 'bg-[#F8FAFC] text-[#64748B]'
              }`}
            >
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase leading-none mb-1">
                PRIORITY
              </span>
              <span
                className={`text-base font-semibold leading-tight block ${
                  task.priority === 'High'
                    ? 'text-[#EF4444]'
                    : task.priority === 'Medium'
                    ? 'text-[#D97706]'
                    : 'text-[#64748B]'
                }`}
              >
                {task.priority} Priority
              </span>
            </div>
          </div>

          {/* Category Block */}
          <div className="flex items-center gap-3 sm:px-4 pt-3 sm:pt-0">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                task.category === 'Study'
                  ? 'bg-[#EFF6FF] text-[#3B82F6]'
                  : task.category === 'Work'
                  ? 'bg-[#F0FDF4] text-[#10B981]'
                  : 'bg-[#FAF5FF] text-[#8B5CF6]'
              }`}
            >
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase leading-none mb-1">
                CATEGORY
              </span>
              <span
                className={`text-base font-semibold leading-tight block ${
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
          <div className="flex items-center gap-3 sm:pl-4 pt-3 sm:pt-0">
            <div className="w-11 h-11 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] text-[#64748B] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase leading-none mb-1">
                DUE DATE
              </span>
              <span className="text-base font-semibold text-[#0F172A] leading-tight block">
                {task.dueDate}
              </span>
              <span className="text-xs text-[#94A3B8] leading-tight block mt-0.5">
                {getRelativeDueDate(task.dueDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Tags & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1 bg-[#F8FAFC] text-[#64748B] text-xs font-medium rounded-full border border-[#F1F5F9]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Mark as Complete Button */}
            <button
              type="button"
              onClick={handleToggle}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
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

            {/* Edit Button */}
            <Button
              variant="secondary"
              icon={Edit2}
              onClick={() => navigate(`/tasks/${task.id}/edit`)}
            >
              Edit
            </Button>

            {/* Delete Button */}
            <Button
              variant="danger"
              icon={Trash2}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
