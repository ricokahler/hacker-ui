import React from 'react';
import { addDecorator } from '@storybook/react';
import ThemeProvider from '../src/ThemeProvider';
import createTheme from '../src/createTheme';

const theme = createTheme();

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
));
