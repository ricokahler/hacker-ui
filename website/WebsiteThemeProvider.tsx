import React, { useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, useMediaQuery } from 'hacker-ui';
import DarkModeContext from './DarkModeContext';

interface Props {
  children: React.ReactNode;
}

const getPrefersDarkModeFromLocalStorage = () => {
  try {
    return localStorage.getItem('prefers-dark-mode') === 'true';
  } catch {}
};

function WebsiteThemeProvider({ children }: Props) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(
    getPrefersDarkModeFromLocalStorage() ?? prefersDarkMode,
  );
  const theme = useMemo(
    () => createTheme({ surface: darkMode ? '#222' : '#fff' }),
    [darkMode],
  );

  useEffect(() => {
    try {
      localStorage.setItem('prefers-dark-mode', darkMode ? 'true' : 'false');
    } catch {}
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
}

export default WebsiteThemeProvider;
