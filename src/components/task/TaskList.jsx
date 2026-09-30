import TaskCard from './TaskCard';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

/**
 * TaskList component to render a collection of TaskCards
 */
export default function TaskList({
  tasks = [],
  onToggleStatus,
  onDelete,
  emptyTitle = 'No tasks found',
  emptyDescription = 'There are no tasks matching the current view or filters.',
  showAddButton = true,
}) {
  const navigate = useNavigate();

  if (tasks.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={
          showAddButton ? (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/tasks/add')}
            >
              Add Task
            </Button>
          ) : null
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
