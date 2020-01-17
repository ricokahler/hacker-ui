import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from 'hacker-ui';
import Docs from './Docs';

const theme = createTheme();

const container = document.createElement('div');
container.style.position = 'fixed';
container.style.top = '0';
container.style.left = '0';
container.style.right = '0';
container.style.bottom = '0';

document.body.appendChild(container);

render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Docs />
    </ThemeProvider>
  </BrowserRouter>,
  container,
);
