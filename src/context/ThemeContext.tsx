'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * THEME PROVIDER
 * ──────────────
 * UX DECISION: Support for 'system' preference as default. 
 * High-net-worth users often use premium hardware (MacBook/Studio Display) 
 * with automated light/dark transitions. Respecting the OS setting provides 
 * a "seamless luxury" experience that adapts to their environment.
 *
 * ENGINEERING: Uses Context API for global availability. Persists to 
 * localStorage to avoid flashes of unstyled content (FOUC) on return visits.
 */

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('aurelius-theme') as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  // Handle theme logic
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      let activeTheme: 'light' | 'dark';

      if (theme === 'system') {
        activeTheme = mediaQuery.matches ? 'dark' : 'light';
      } else {
        activeTheme = theme;
      }

      setResolvedTheme(activeTheme);
      
      // Update DOM class
      if (activeTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
      
      // Update data attribute for specific component styling if needed
      root.setAttribute('data-theme', activeTheme);
    };

    updateTheme();
    localStorage.setItem('aurelius-theme', theme);

    // Listen for system changes if in system mode
    const listener = () => {
      if (theme === 'system') updateTheme();
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
