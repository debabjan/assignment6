/**
 * Global Color & Design System
 * Centralized color definitions used across all pages and components
 */

export const COLORS = {
  background: '#F7F8FA',
  surface: '#FFFFFF',
  surfaceSoft: '#F2F4F7',

  textPrimary: '#17202A',
  textSecondary: '#667085',
  textMuted: '#98A2B3',

  border: '#E5E7EB',

  accent: '#5865F2',
  accentSoft: '#EEF0FF',

  success: '#2E8B76',
  successSoft: '#EBF6F3',

  warning: '#C58A36',
  warningSoft: '#FEF8EE',

  error: '#C94C4C',
  errorSoft: '#FDF2F2',
};

// Priority badge colors
export const PRIORITY_COLORS = {
  High: {
    bg: '#FDF2F2',
    text: '#C94C4C',
    border: '#F8D7DA',
  },
  Medium: {
    bg: '#FEF8EE',
    text: '#C58A36',
    border: '#FCEFD8',
  },
  Low: {
    bg: '#F2F4F7',
    text: '#667085',
    border: '#E5E7EB',
  },
};

// Category badge colors
export const CATEGORY_COLORS = {
  Study: {
    bg: '#EEF0FF',
    text: '#5865F2',
    border: '#D9DCFD',
  },
  Work: {
    bg: '#EBF6F3',
    text: '#2E8B76',
    border: '#D1ECE5',
  },
  Personal: {
    bg: '#F5EEF9',
    text: '#7C3AED',
    border: '#E9D5FF',
  },
};

// Status badge colors
export const STATUS_COLORS = {
  Pending: {
    bg: '#FEF8EE',
    text: '#C58A36',
    border: '#FCEFD8',
  },
  Completed: {
    bg: '#EBF6F3',
    text: '#2E8B76',
    border: '#D1ECE5',
  },
};
