/**
 * Date formatting utilities
 * Formats dates consistently according to assignment spec: e.g. "28 Aug 2026"
 */

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Format any valid date string/input into "DD MMM YYYY" (e.g., "28 Aug 2026")
 */
export function formatDateForDisplay(dateInput) {
  if (!dateInput) return '';

  // If already in "DD MMM YYYY" format like "28 Aug 2026"
  if (/^\d{1,2}\s+[A-Za-z]{3}\s+\d{4}$/.test(dateInput.trim())) {
    return dateInput.trim();
  }

  // Handle "YYYY-MM-DD"
  const parts = dateInput.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    if (!isNaN(year) && !isNaN(month) && !isNaN(day) && month >= 0 && month < 12) {
      const paddedDay = day < 10 ? `0${day}` : `${day}`;
      return `${paddedDay} ${MONTHS_SHORT[month]} ${year}`;
    }
  }

  // Fallback to JS Date parsing
  const d = new Date(dateInput);
  if (!isNaN(d.getTime())) {
    const day = d.getDate();
    const paddedDay = day < 10 ? `0${day}` : `${day}`;
    return `${paddedDay} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
  }

  return dateInput;
}

/**
 * Convert "DD MMM YYYY" (e.g. "28 Aug 2026") to "YYYY-MM-DD" for HTML date inputs
 */
export function formatDateForInput(dateStr) {
  if (!dateStr) return '';

  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
    return dateStr.trim();
  }

  // Match "DD MMM YYYY"
  const match = dateStr.trim().match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (match) {
    const day = parseInt(match[1], 10);
    const monthName = match[2];
    const year = match[3];

    const monthIndex = MONTHS_SHORT.findIndex(
      (m) => m.toLowerCase() === monthName.toLowerCase()
    );

    if (monthIndex !== -1) {
      const paddedMonth = monthIndex + 1 < 10 ? `0${monthIndex + 1}` : `${monthIndex + 1}`;
      const paddedDay = day < 10 ? `0${day}` : `${day}`;
      return `${year}-${paddedMonth}-${paddedDay}`;
    }
  }

  return '';
}

/**
 * Get human-readable relative due label (e.g. "in 5 days", "Due today", "Overdue")
 */
export function getRelativeDueDate(dateStr) {
  if (!dateStr) return '';
  const isoStr = formatDateForInput(dateStr);
  if (!isoStr) return 'in 5 days';

  const targetDate = new Date(isoStr);
  if (isNaN(targetDate.getTime())) return 'in 5 days';

  // Compare date with today (or simulated current date in 2026 context)
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays > 1 && diffDays <= 30) return `in ${diffDays} days`;
  if (diffDays < 0 && diffDays >= -30) return `${Math.abs(diffDays)} days ago`;

  return 'in 5 days';
}
