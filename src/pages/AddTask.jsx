import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/task/TaskForm';
import Button from '../components/common/Button';

/**
 * AddTask Page (/tasks/add)
 * Clean card-based task creation that fits inside the screen without scrolling
 */
export default function AddTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleCreate = (taskData) => {
    addTask(taskData);
    navigate('/tasks');
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Compact Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/tasks')}
        >
          Back to Tasks
        </Button>
        <span className="text-xs font-medium text-[#94A3B8]">
          Create Task Card
        </span>
      </div>

      {/* Card-Style Task Form */}
      <TaskForm
        onSubmit={handleCreate}
        onCancel={handleCancel}
        isEditing={false}
      />
    </div>
  );
}
