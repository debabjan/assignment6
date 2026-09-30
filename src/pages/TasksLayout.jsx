import { Outlet } from 'react-router-dom';

/**
 * TasksLayout (Parent route for /tasks)
 * Demonstrates React Router Nested Routing by rendering child routes via <Outlet />
 * Child routes:
 *  - /tasks (index route -> Tasks list)
 *  - /tasks/add (nested route -> AddTask form)
 *  - /tasks/:taskId (dynamic nested route -> TaskDetails)
 *  - /tasks/:taskId/edit (dynamic nested route -> EditTask form)
 */
export default function TasksLayout() {
  return (
    <div className="w-full">
      {/* React Router nested route Outlet */}
      <Outlet />
    </div>
  );
}
