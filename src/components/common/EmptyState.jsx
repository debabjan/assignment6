import { Inbox } from 'lucide-react';

/**
 * Reusable EmptyState component for lists and not found views
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No tasks found',
  description = 'There are no tasks matching the selected criteria.',
  action = null,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 md:p-12 bg-white rounded-xl border border-[#E5E7EB] ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[#F2F4F7] text-[#667085] flex items-center justify-center mb-3.5">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-[#17202A] mb-1">{title}</h3>
      {description && <p className="text-sm text-[#667085] max-w-sm mb-5 leading-relaxed">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
