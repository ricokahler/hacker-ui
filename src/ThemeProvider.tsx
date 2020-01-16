/** @pragma export */
import React from 'react';
import { Theme } from './types';
import ThemeContext from './ThemeContext';

interface Props {
  theme: Theme;
  children?: React.ReactNode;
}

function ThemeProvider({ theme, children }: Props) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
