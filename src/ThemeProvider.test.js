import React, { useContext, useEffect } from 'react';
import { act, create } from 'react-test-renderer';
import DeferredPromise from './DeferredPromise';
import createTheme from './createTheme';
import ThemeContext from './ThemeContext';
import ThemeProvider from './ThemeProvider';

const theme = createTheme();

it('injects the theme via context', async () => {
  const themeHandler = jest.fn();
  const done = new DeferredPromise();

  function Test() {
    const theme = useContext(ThemeContext);
    useEffect(() => {
      themeHandler(theme);
      done.resolve();
    }, [theme]);

    return null;
  }

  await act(async () => {
    create(
      <ThemeProvider theme={theme}>
        <Test />
      </ThemeProvider>,
    );
    await done;
  });

  const themeFromContext = themeHandler.mock.calls[0][0];

  expect(themeFromContext).toBe(theme);
});
