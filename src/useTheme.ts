import { useContext } from 'react';
import invariant from 'invariant';
import ThemeContext from './ThemeContext';

function useTheme() {
  const theme = useContext(ThemeContext);
  invariant(
    theme,
    '[hacker-ui] could not find theme context. ensure your app is wrapped with a theme provider.',
  );

  return theme;
}

export default useTheme;
