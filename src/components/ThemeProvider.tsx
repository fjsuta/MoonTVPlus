'use client';

import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';
import { useEffect } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    const savedThemeColor = localStorage.getItem('themeColor');
    if (savedThemeColor) {
      document.documentElement.setAttribute('data-theme-color', savedThemeColor);
    }
    const savedUiStyle = localStorage.getItem('uiStyle');
    if (savedUiStyle) {
      document.documentElement.setAttribute('data-ui-style', savedUiStyle);
    }
  }, []);

  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
