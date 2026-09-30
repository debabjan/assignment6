
/**
 * Reusable Input component with label and error state handling
 */
export default function Input({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  helperText = '',
  className = '',
  ...props
}) {
  const inputId = id || name;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[#17202A] flex items-center justify-between">
          <span>
            {label}
            {required && <span className="text-[#C94C4C] ml-1">*</span>}
          </span>
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3.5 py-2.5 text-sm bg-white text-[#17202A] placeholder-[#98A2B3] border rounded-xl shadow-2xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:border-transparent ${
          error ? 'border-[#C94C4C] focus:ring-[#C94C4C]' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
        } ${className}`}
        {...props}
      />

      {error ? (
        <p className="text-xs text-[#C94C4C] font-normal">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#667085]">{helperText}</p>
      ) : null}
    </div>
  );
}
