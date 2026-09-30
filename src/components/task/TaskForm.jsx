import { useState } from 'react';
import { PRIORITIES, CATEGORIES, STATUSES } from '../../data/tasks';
import { formatDateForInput, formatDateForDisplay } from '../../utils/dateUtils';
import { Plus, Check, Flag, Folder, Calendar } from 'lucide-react';
import Select from '../common/Select';
import Button from '../common/Button';

/**
 * TaskForm component matching the exact Task Card design language
 * Provides a dedicated title box and spacious description box
 * Sized to fit comfortably inside the viewport without page scrolling
 */
export default function TaskForm({
  initialValues = null,
  onSubmit,
  onCancel,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    priority: initialValues?.priority || 'Medium',
    category: initialValues?.category || 'Study',
    dueDate: initialValues?.dueDate
      ? formatDateForInput(initialValues.dueDate)
      : new Date().toISOString().split('T')[0],
    status: initialValues?.status || 'Pending',
    tags: initialValues?.tags ? initialValues.tags.join(', ') : '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required.';
    } else if (formData.description.trim().length < 4) {
      newErrors.description = 'Description must be at least 4 characters long.';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedTags = formData.tags
      ? formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [formData.category, `${formData.priority} Priority`];

    const formattedData = {
      ...formData,
      title: formData.title.trim() || formData.description.trim().slice(0, 30),
      tags: parsedTags,
      dueDate: formatDateForDisplay(formData.dueDate),
    };

    onSubmit(formattedData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-7 shadow-xs max-w-4xl mx-auto flex flex-col gap-4"
    >
      {/* Top Header Row: Icon Badge & Title Indicator + Status Dropdown */}
      <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#D9DCFD] bg-[#EEF2FF] text-[#5865F2] flex items-center justify-center shrink-0">
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] leading-tight">
              {isEditing ? `Edit Task #${initialValues?.id || ''}` : 'Create Task'}
            </h3>
            <p className="text-[11px] text-[#94A3B8]">
              Card details & scheduling
            </p>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="w-36">
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={STATUSES}
          />
        </div>
      </div>

      {/* Title & Spacious Description Boxes */}
      <div className="space-y-3">
        {/* Task Title Box */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-xs font-semibold text-[#475569] uppercase tracking-wider">
            Task Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Complete DBMS Assignment"
            className="w-full px-4 py-2.5 text-base font-semibold text-[#0F172A] placeholder-[#94A3B8] bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#5865F2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2]/15 transition-all shadow-2xs"
          />
        </div>

        {/* Spacious Task Description Box */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label htmlFor="description" className="text-xs font-semibold text-[#475569] uppercase tracking-wider">
              Description <span className="text-[#EF4444]">*</span>
            </label>
            <span className="text-[11px] text-[#94A3B8]">
              {formData.description.length} characters
            </span>
          </div>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide detailed description, requirements, or steps (e.g., Prepare the ER diagram, schema normalization, and write SQL queries for the assignment)..."
            className={`w-full px-4 py-2.5 text-sm text-[#334155] placeholder-[#94A3B8] bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2]/15 transition-all shadow-2xs resize-none leading-relaxed ${
              errors.description
                ? 'border-[#EF4444] focus:border-[#EF4444]'
                : 'border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#5865F2]'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-[#EF4444] font-medium">{errors.description}</p>
          )}
        </div>
      </div>

      {/* Middle Section: 3-column stats with vertical dividers matching the card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center py-3 divide-y sm:divide-y-0 sm:divide-x divide-[#F1F5F9] border-y border-[#F1F5F9] gap-3 sm:gap-0">
        {/* Priority Column */}
        <div className="flex items-center gap-3 sm:pr-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              formData.priority === 'High'
                ? 'bg-[#FEF2F2] text-[#EF4444]'
                : formData.priority === 'Medium'
                ? 'bg-[#FFFBEB] text-[#F59E0B]'
                : 'bg-[#F8FAFC] text-[#64748B]'
            }`}
          >
            <Flag className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-[10px] font-bold text-[#94A3B8] tracking-wider uppercase leading-none mb-1">
              PRIORITY
            </span>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              options={PRIORITIES}
            />
          </div>
        </div>

        {/* Category Column */}
        <div className="flex items-center gap-3 sm:px-4 pt-2.5 sm:pt-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              formData.category === 'Study'
                ? 'bg-[#EFF6FF] text-[#3B82F6]'
                : formData.category === 'Work'
                ? 'bg-[#F0FDF4] text-[#10B981]'
                : 'bg-[#FAF5FF] text-[#8B5CF6]'
            }`}
          >
            <Folder className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-[10px] font-bold text-[#94A3B8] tracking-wider uppercase leading-none mb-1">
              CATEGORY
            </span>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={CATEGORIES}
            />
          </div>
        </div>

        {/* Due Date Column */}
        <div className="flex items-center gap-3 sm:pl-4 pt-2.5 sm:pt-0">
          <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] text-[#64748B] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-[10px] font-bold text-[#94A3B8] tracking-wider uppercase leading-none mb-1">
              DUE DATE
            </span>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full text-sm font-semibold text-[#0F172A] bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2] shadow-2xs"
            />
            {errors.dueDate && (
              <p className="text-[10px] text-[#EF4444] font-medium mt-0.5">{errors.dueDate}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Tags Input on Left + Actions on Right */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        {/* Tags input */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-md">
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags: DBMS, SQL, Normalization (comma separated)"
            className="w-full px-4 py-2 bg-[#F8FAFC] text-xs font-medium text-[#475569] placeholder-[#94A3B8] rounded-full border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#5865F2] focus:bg-white transition-all shadow-2xs"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white shadow-xs transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isEditing ? 'Save Changes' : 'Add Task'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
