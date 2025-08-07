// Theme configuration and utilities

export type Theme = 'light' | 'dark';

export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  accent: string;
  accentLight: string;
  
  // Background colors
  bg: string;
  bgSecondary: string;
  bgTertiary: string;
  surface: string;
  surfaceHover: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  
  // Border colors
  border: string;
  borderLight: string;
  
  // Gradients
  gradientPrimary: string;
  gradientHero: string;
  gradientCard: string;
  gradientAccent: string;
  
  // Status colors
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export const themes: Record<Theme, ThemeColors> = {
  light: {
    // Primary colors
    primary: '#1e40af',
    primaryLight: '#3b82f6',
    primaryDark: '#1e3a8a',
    secondary: '#10b981',
    secondaryLight: '#34d399',
    accent: '#f59e0b',
    accentLight: '#fbbf24',
    
    // Background colors
    bg: '#ffffff',
    bgSecondary: '#f8fafc',
    bgTertiary: '#f1f5f9',
    surface: '#ffffff',
    surfaceHover: '#f8fafc',
    
    // Text colors
    text: '#0f172a',
    textSecondary: '#475569',
    textTertiary: '#64748b',
    textInverse: '#ffffff',
    
    // Border colors
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    
    // Gradients
    gradientPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradientHero: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #db2777 100%)',
    gradientCard: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    gradientAccent: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    
    // Status colors
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },
  dark: {
    // Primary colors
    primary: '#60a5fa',
    primaryLight: '#93bbfc',
    primaryDark: '#3b82f6',
    secondary: '#34d399',
    secondaryLight: '#6ee7b7',
    accent: '#fbbf24',
    accentLight: '#fcd34d',
    
    // Background colors
    bg: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    surface: '#1e293b',
    surfaceHover: '#334155',
    
    // Text colors
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    textInverse: '#0f172a',
    
    // Border colors
    border: '#334155',
    borderLight: '#1e293b',
    
    // Gradients
    gradientPrimary: 'linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%)',
    gradientHero: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 50%, #831843 100%)',
    gradientCard: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    gradientAccent: 'linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)',
    
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#f87171',
    info: '#60a5fa'
  }
};

// Theme utilities
export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored) return stored;
  
  // Default to dark mode
  return 'dark';
};

export const setTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update CSS custom properties
  const colors = themes[theme];
  const root = document.documentElement;
  
  Object.entries(colors).forEach(([key, value]) => {
    const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });
};

export const toggleTheme = (): Theme => {
  const current = getTheme();
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
  return next;
};

// Initialize theme on load
export const initTheme = (): void => {
  if (typeof window === 'undefined') return;
  
  const theme = getTheme();
  setTheme(theme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const storedTheme = localStorage.getItem('theme');
    if (!storedTheme) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
};