import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Plus, Menu, X } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import Button from '../common/Button';

/**
 * Top Navigation Bar
 * Layout: Left (Brand) | Center (Home, Task, Completed) | Right (Add Task Button)
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { stats } = useTasks();
  const navigate = useNavigate();

  const navLinks = [
    {
      to: '/dashboard',
      label: 'Home',
    },
    {
      to: '/tasks',
      label: 'Task',
      badge: stats.pending,
      end: true,
    },
    {
      to: '/completed',
      label: 'Completed',
      badge: stats.completed,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-16">
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center justify-start">
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <div className="w-8 h-8 rounded-lg bg-[#5865F2] flex items-center justify-center text-white font-bold text-sm shadow-xs">
                TM
              </div>
              <span className="text-base font-bold text-[#17202A] leading-tight tracking-tight">
                Task Manager
              </span>
            </Link>
          </div>

          {/* Center: Navigation Options */}
          <nav className="hidden md:flex items-center justify-center gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EEF0FF] text-[#5865F2] font-semibold'
                      : 'text-[#667085] hover:bg-[#F2F4F7] hover:text-[#17202A]'
                  }`
                }
              >
                <span>{link.label}</span>
                {typeof link.badge === 'number' && link.badge > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#F2F4F7] text-[#667085] font-semibold text-[11px]">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: Add Task Button & Mobile Toggle */}
          <div className="flex items-center justify-end gap-3">
            {/* Prominent Add Task Button */}
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => navigate('/tasks/add')}
            >
              <span>Add Task</span>
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-[#667085] hover:text-[#17202A] hover:bg-[#F2F4F7] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#EEF0FF] text-[#5865F2] font-semibold'
                    : 'text-[#667085] hover:bg-[#F2F4F7] hover:text-[#17202A]'
                }`
              }
            >
              <span>{link.label}</span>
              {typeof link.badge === 'number' && link.badge > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#F2F4F7] text-[#667085] font-semibold">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
