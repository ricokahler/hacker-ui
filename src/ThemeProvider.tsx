import React from 'react';
import {
  ThemeProvider as RssThemeProvider,
  ColorContextProvider,
} from 'react-style-system';
import { Theme } from './types';

interface Props {
  theme: Theme;
  children: React.ReactNode;
}

function ThemeProvider({ theme, children }: Props) {
  return (
    <RssThemeProvider theme={theme}>
      <ColorContextProvider
        color={theme.colors.accent}
        surface={theme.colors.surface}
      >
        {children}
      </ColorContextProvider>
    </RssThemeProvider>
  );
}

export default ThemeProvider;
