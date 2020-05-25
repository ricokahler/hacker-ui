import React, { useMemo, useState } from 'react';
import { ThemeProvider, createTheme, useMediaQuery } from 'hacker-ui';
import DarkModeContext from './DarkModeContext';

interface Props {
  children: React.ReactNode;
}

function WebsiteThemeProvider({ children }: Props) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const theme = useMemo(
    () => createTheme({ surface: darkMode ? '#222' : '#fff' }),
    [darkMode],
  );

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
}

export default WebsiteThemeProvider;
