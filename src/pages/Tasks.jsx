import { useTasks } from '../context/TaskContext';
import TaskFilters from '../components/task/TaskFilters';
import TaskList from '../components/task/TaskList';

/**
 * Tasks Page (/tasks)
 * Displays all active/pending tasks with filtering options
 */
export default function Tasks() {
  const {
    filteredActiveTasks,
    activeTasks,
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    toggleTaskStatus,
    deleteTask,
  } = useTasks();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="text-xl font-bold text-[#17202A]">My Tasks</h2>
        <p className="text-sm text-[#667085] mt-0.5">
          {activeTasks.length} active {activeTasks.length === 1 ? 'task' : 'tasks'} pending completion
        </p>
      </div>

      {/* Task Filters */}
      <TaskFilters
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        totalResults={filteredActiveTasks.length}
      />

      {/* Task List */}
      <TaskList
        tasks={filteredActiveTasks}
        onToggleStatus={toggleTaskStatus}
        onDelete={deleteTask}
        emptyTitle={
          activeTasks.length === 0
            ? 'No pending tasks'
            : 'No tasks match your filters'
        }
        emptyDescription={
          activeTasks.length === 0
            ? 'You have completed all your tasks!'
            : 'Try changing or resetting your priority or category filters.'
        }
        showAddButton={false}
      />
    </div>
  );
}
