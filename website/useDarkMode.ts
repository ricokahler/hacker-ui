import { useContext } from 'react';
import DarkModeContext from './DarkModeContext';

function useDarkMode() {
  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) {
    throw new Error('Could not find dark mode context');
  }

  return darkModeContext;
}

export default useDarkMode;
