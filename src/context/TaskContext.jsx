/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { initialTasks } from '../data/tasks';
import { formatDateForDisplay } from '../utils/dateUtils';

const TaskContext = createContext(null);

const STORAGE_KEY = 'assn06_task_manager_data';

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((t) => ({
          ...t,
          title: t.title || t.description,
          tags: t.tags && t.tags.length > 0 ? t.tags : [t.category, `${t.priority} Priority`],
        }));
      }
    } catch {
      // Fallback if local storage fails
    }
    return initialTasks;
  });

  // Filter states
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Persist to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignore storage errors
    }
  }, [tasks]);

  // Create Task
  const addTask = (taskData) => {
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = {
      id: nextId,
      title: taskData.title?.trim() || taskData.description.trim().slice(0, 30),
      description: taskData.description.trim(),
      priority: taskData.priority || 'Medium',
      category: taskData.category || 'Study',
      dueDate: formatDateForDisplay(taskData.dueDate) || '28 Aug 2026',
      status: taskData.status || 'Pending',
      tags: taskData.tags && taskData.tags.length > 0
        ? taskData.tags
        : [taskData.category, `${taskData.priority || 'Medium'} Priority`],
    };

    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  // Update Task (preserves task id)
  const updateTask = (id, updatedFields) => {
    const numericId = Number(id);
    let updatedTask = null;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === numericId) {
          updatedTask = {
            ...t,
            ...updatedFields,
            id: numericId, // Ensure ID is preserved
            title: updatedFields.title ? updatedFields.title.trim() : (t.title || t.description),
            description: updatedFields.description ? updatedFields.description.trim() : t.description,
            dueDate: updatedFields.dueDate ? formatDateForDisplay(updatedFields.dueDate) : t.dueDate,
            tags: updatedFields.tags || t.tags,
          };
          return updatedTask;
        }
        return t;
      })
    );

    return updatedTask;
  };

  // Delete Task
  const deleteTask = (id) => {
    const numericId = Number(id);
    setTasks((prev) => prev.filter((t) => t.id !== numericId));
  };

  // Complete / Toggle Task Status (Pending <-> Completed)
  const toggleTaskStatus = (id) => {
    const numericId = Number(id);
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === numericId) {
          const newStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
  };

  // Mark task as complete directly
  const completeTask = (id) => {
    const numericId = Number(id);
    setTasks((prev) =>
      prev.map((t) => (t.id === numericId ? { ...t, status: 'Completed' } : t))
    );
  };

  // Find task by ID
  const getTaskById = (id) => {
    const numericId = Number(id);
    return tasks.find((t) => t.id === numericId);
  };

  // Reset to initial sample tasks
  const resetToSampleTasks = () => {
    setTasks(initialTasks);
    setPriorityFilter('All');
    setCategoryFilter('All');
  };

  // Filtered lists
  const activeTasks = tasks.filter((t) => t.status === 'Pending');
  const completedTasks = tasks.filter((t) => t.status === 'Completed');

  const filterList = (list) => {
    return list.filter((task) => {
      const matchPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      const matchCategory = categoryFilter === 'All' || task.category === categoryFilter;
      return matchPriority && matchCategory;
    });
  };

  const filteredActiveTasks = filterList(activeTasks);
  const filteredCompletedTasks = filterList(completedTasks);

  // Statistics for Dashboard
  const stats = {
    total: tasks.length,
    pending: activeTasks.length,
    completed: completedTasks.length,
    highPriority: tasks.filter((t) => t.priority === 'High' && t.status === 'Pending').length,
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activeTasks,
        completedTasks,
        filteredActiveTasks,
        filteredCompletedTasks,
        priorityFilter,
        setPriorityFilter,
        categoryFilter,
        setCategoryFilter,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        completeTask,
        getTaskById,
        resetToSampleTasks,
        stats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
