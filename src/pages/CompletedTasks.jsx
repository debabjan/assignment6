import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/task/TaskCard';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

/**
 * CompletedTasks Page (/completed)
 * Displays all completed tasks with option to return them to pending
 */
export default function CompletedTasks() {
  const { completedTasks, toggleTaskStatus, deleteTask } = useTasks();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Title & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#17202A]">Completed Tasks</h2>
          <p className="text-sm text-[#667085] mt-0.5">
            {completedTasks.length} {completedTasks.length === 1 ? 'task' : 'tasks'} marked as completed
          </p>
        </div>

        {completedTasks.length > 0 && (
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowRight}
            onClick={() => navigate('/tasks')}
          >
            View Active Tasks
          </Button>
        )}
      </div>

      {/* Completed Tasks List or Empty State */}
      {completedTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={toggleTaskStatus}
              onDelete={deleteTask}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CheckCircle2}
          title="No completed tasks yet."
          description="When you complete tasks from your active task list, they will be archived here. You can also restore them to pending at any time."
          action={
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/tasks')}
            >
              Go to Tasks
            </Button>
          }
        />
      )}
    </div>
  );
}
