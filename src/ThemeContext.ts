// @pragma export
import { Theme } from './types';
import { createContext } from 'react';
export default createContext<Theme | null>(null);
