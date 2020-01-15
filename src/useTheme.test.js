import React, { useEffect } from 'react';
import { act, create } from 'react-test-renderer';
import DeferredPromise from './DeferredPromise';
import createTheme from './createTheme';
import ThemeProvider from './ThemeProvider';
import useTheme from './useTheme';

const baseTheme = createTheme();

it('grabs the theme from context', async () => {
  const done = new DeferredPromise();
  const themeHandler = jest.fn();

  function Test() {
    const theme = useTheme();

    useEffect(() => {
      themeHandler(theme);
      done.resolve();
    }, [theme]);

    return null;
  }

  await act(async () => {
    create(
      <ThemeProvider theme={baseTheme}>
        <Test />
      </ThemeProvider>,
    );
    await done;
  });

  const themeFromUseTheme = themeHandler.mock.calls[0][0];

  expect(themeFromUseTheme).toBe(baseTheme);
});
