import React from 'react';
import {
  ThemeProvider as RssThemeProvider,
  ColorContextProvider,
} from 'react-style-system';
import { DefaultTheme } from './types';
import defaultTheme from './defaultTheme';

interface Props {
  theme?: DefaultTheme;
  children?: React.ReactNode;
}

function ThemeProvider({ theme = defaultTheme, children }: Props) {
  return (
    <RssThemeProvider theme={theme}>
      <ColorContextProvider color={theme.accent} surface={theme.surface}>
        {children}
      </ColorContextProvider>
    </RssThemeProvider>
  );
}

export default ThemeProvider;
