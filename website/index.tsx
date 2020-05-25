import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import WebsiteThemeProvider from './WebsiteThemeProvider';
import App from './App';
import '@babel/polyfill';
import './index.css';

const container = document.createElement('div');
container.style.position = 'fixed';
container.style.top = '0';
container.style.left = '0';
container.style.right = '0';
container.style.bottom = '0';

document.body.appendChild(container);

render(
  <BrowserRouter>
    <WebsiteThemeProvider>
      <App />
    </WebsiteThemeProvider>
  </BrowserRouter>,
  container,
);
