import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

/**
 * AppLayout component
 * Provides top Navbar layout shell and renders child routes via <Outlet />
 */
export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col antialiased text-[#17202A]">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
