import React, { createContext } from 'react';

export interface DarkModeContextValue {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default createContext<DarkModeContextValue | null>(null);
