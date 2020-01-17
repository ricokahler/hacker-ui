import React from 'react';
import { addDecorator } from '@storybook/react';
import ThemeProvider from '../src/ThemeProvider';
import createTheme from '../src/createTheme';
import useCssReset from '../src/useCssReset';

const theme = createTheme();

addDecorator(storyFn => {
  useCssReset();

  return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
});
