import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/task/TaskCard';
import EmptyState from '../components/common/EmptyState';

/**
 * Dashboard / Home Page (/dashboard)
 * Shows task summary statistics and a section of recent active tasks
 */
export default function Dashboard() {
  const { stats, activeTasks, toggleTaskStatus, deleteTask } = useTasks();

  // Show up to 4 recent pending tasks (2 per row)
  const recentTasks = activeTasks.slice(0, 4);

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: CheckSquare,
      iconColor: '#5865F2',
      bgColor: '#EEF0FF',
    },
    {
      label: 'Pending Tasks',
      value: stats.pending,
      icon: Clock,
      iconColor: '#C58A36',
      bgColor: '#FEF8EE',
    },
    {
      label: 'Completed Tasks',
      value: stats.completed,
      icon: CheckCircle2,
      iconColor: '#2E8B76',
      bgColor: '#EBF6F3',
    },
    {
      label: 'High Priority',
      value: stats.highPriority,
      icon: AlertCircle,
      iconColor: '#C94C4C',
      bgColor: '#FDF2F2',
    },
  ];

  return (
    <div className="space-y-8">

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-2xs flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium text-[#667085] uppercase tracking-wider">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-[#17202A] mt-1.5">
                  {card.value}
                </p>
              </div>
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: card.bgColor }}
              >
                <Icon className="w-5 h-5" style={{ color: card.iconColor }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#17202A]">Recent Tasks</h3>
            <p className="text-xs text-[#667085]">
              Active tasks waiting for completion
            </p>
          </div>
          {activeTasks.length > 0 && (
            <Link
              to="/tasks"
              className="text-xs font-semibold text-[#5865F2] hover:text-[#4752C4] flex items-center gap-1"
            >
              <span>View All Tasks ({activeTasks.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {recentTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recentTasks.map((task) => (
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
            title="All tasks completed"
            description="You have no pending tasks right now. Great job!"
          />
        )}
      </div>
    </div>
  );
}
