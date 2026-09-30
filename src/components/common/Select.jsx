import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Premium Global Custom Dropdown Component
 * Features:
 * - Custom styled trigger button with animated chevron
 * - Floating options menu with smooth open/close
 * - Outside click listener
 * - Active item indicator with checkmark
 * - Seamless compatibility with standard onChange({ target: { name, value } })
 */
export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error = '',
  helperText = '',
  className = '',
  placeholder = 'Select an option',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Normalize options array
  const formattedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return { value: opt.value, label: opt.label ?? opt.value };
    }
    return { value: opt, label: opt };
  });

  const selectedOption = formattedOptions.find((opt) => opt.value === value);

  const handleSelect = (optionVal) => {
    if (onChange) {
      // Direct drop-in compatibility with React form change handlers
      onChange({
        target: {
          name,
          value: optionVal,
        },
      });
    }
    setIsOpen(false);
  };

  const selectId = id || name;

  return (
    <div className={`w-full flex flex-col gap-1.5 relative ${className}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-[#17202A] flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-[#C94C4C] ml-1">*</span>}
          </span>
        </label>
      )}

      {/* Hidden input for accessibility / form submissions */}
      <input type="hidden" name={name} id={selectId} value={value || ''} />

      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-3.5 py-2.5 text-sm bg-white text-[#17202A] border rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer shadow-2xs text-left focus:outline-none focus:ring-2 focus:ring-[#5865F2] ${
          isOpen ? 'border-[#5865F2] ring-2 ring-[#5865F2]/20' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
        } ${error ? 'border-[#C94C4C] focus:ring-[#C94C4C]' : ''}`}
      >
        <span className={selectedOption ? 'font-medium text-[#0F172A]' : 'text-[#94A3B8]'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#5865F2]' : ''
          }`}
        />
      </button>

      {/* Floating Options Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full z-50 bg-white border border-[#E2E8F0] rounded-xl shadow-lg py-1.5 max-h-60 overflow-y-auto animate-in fade-in duration-100">
          {formattedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full px-3.5 py-2 text-sm text-left flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#EEF2FF] text-[#4F46E5] font-semibold'
                    : 'text-[#1E293B] hover:bg-[#F8FAFC]'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#4F46E5]" />}
              </button>
            );
          })}
        </div>
      )}

      {error ? (
        <p className="text-xs text-[#C94C4C] font-normal">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#64748B]">{helperText}</p>
      ) : null}
    </div>
  );
}
