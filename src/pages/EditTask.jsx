import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/task/TaskForm';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';

/**
 * EditTask Page (/tasks/:taskId/edit)
 * Demonstrates editing existing tasks reusing TaskForm and preserving the task ID
 */
export default function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask } = useTasks();

  const task = getTaskById(taskId);

  if (!task) {
    return (
      <div className="py-10 max-w-2xl mx-auto">
        <EmptyState
          icon={AlertCircle}
          title="Task not found."
          description={`Cannot edit task with ID #${taskId} because it was not found.`}
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

  const handleUpdate = (formData) => {
    updateTask(task.id, formData);
    navigate(`/tasks/${task.id}`);
  };

  const handleCancel = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Compact Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={handleCancel}
        >
          Back to Task
        </Button>
        <span className="text-xs font-mono bg-white text-[#64748B] px-3 py-1 rounded-full border border-[#E2E8F0]">
          Editing Task #{task.id}
        </span>
      </div>

      {/* Reused Card-Style TaskForm */}
      <TaskForm
        initialValues={task}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
        isEditing={true}
      />
    </div>
  );
}
