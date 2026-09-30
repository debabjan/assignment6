import { PRIORITY_COLORS, CATEGORY_COLORS, STATUS_COLORS } from '../../constants/colors';

/**
 * Task Badge component for Status, Priority, and Category
 * Adheres strictly to global design system colors
 */
export function StatusBadge({ status }) {
  const config = STATUS_COLORS[status] || STATUS_COLORS.Pending;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: config.text }}
      />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const config = PRIORITY_COLORS[priority] || PRIORITY_COLORS.Low;

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
      }}
    >
      {priority} Priority
    </span>
  );
}

export function CategoryBadge({ category }) {
  const config = CATEGORY_COLORS[category] || CATEGORY_COLORS.Study;

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
      }}
    >
      {category}
    </span>
  );
}

export default function TaskStatus({ status, priority, category }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {status && <StatusBadge status={status} />}
      {priority && <PriorityBadge priority={priority} />}
      {category && <CategoryBadge category={category} />}
    </div>
  );
}
