import { useContext } from 'react';
import ColorContext from './ColorContext';

function useColorContext() {
  return useContext(ColorContext);
}

export default useColorContext;
