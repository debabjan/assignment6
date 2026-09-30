import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';

// Layout shell
import AppLayout from './components/layout/AppLayout';

// Pages
import Dashboard from './pages/Dashboard';
import TasksLayout from './pages/TasksLayout';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import TaskDetails from './pages/TaskDetails';
import EditTask from './pages/EditTask';
import CompletedTasks from './pages/CompletedTasks';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          {/* Top-level Layout Route */}
          <Route path="/" element={<AppLayout />}>
            {/* Default Redirect: / -> /dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* Basic Route: Dashboard */}
            <Route path="dashboard" element={<Dashboard />} />

            {/* Nested Routes under Parent /tasks Route */}
            <Route path="tasks" element={<TasksLayout />}>
              {/* Index Route: /tasks (Active task list) */}
              <Route index element={<Tasks />} />

              {/* Nested Route: /tasks/add (Create task form) */}
              <Route path="add" element={<AddTask />} />

              {/* Dynamic Nested Route: /tasks/:taskId (URL Parameter demonstration) */}
              <Route path=":taskId" element={<TaskDetails />} />

              {/* Dynamic Nested Route: /tasks/:taskId/edit (Edit task form) */}
              <Route path=":taskId/edit" element={<EditTask />} />
            </Route>

            {/* Basic Route: Completed Tasks */}
            <Route path="completed" element={<CompletedTasks />} />

            {/* Fallback Route for Unknown URLs */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}
