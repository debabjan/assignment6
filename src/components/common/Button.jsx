
/**
 * Reusable Button component adhering to global design system
 * Supports primary, secondary, danger, ghost, and subtle variants
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-4 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#5865F2] hover:bg-[#4752C4] text-white border border-transparent shadow-xs focus:ring-[#5865F2]',
    secondary:
      'bg-white hover:bg-[#F2F4F7] text-[#17202A] border border-[#E5E7EB] shadow-xs focus:ring-[#E5E7EB]',
    danger:
      'bg-[#FDF2F2] hover:bg-[#FCE8E8] text-[#C94C4C] border border-[#F8D7DA] focus:ring-[#C94C4C]',
    ghost:
      'bg-transparent hover:bg-[#F2F4F7] text-[#667085] hover:text-[#17202A] border border-transparent focus:ring-[#E5E7EB]',
    subtle:
      'bg-[#EEF0FF] hover:bg-[#E0E3FF] text-[#5865F2] border border-transparent focus:ring-[#5865F2]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      {children}
    </button>
  );
}
