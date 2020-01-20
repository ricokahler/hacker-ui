import { createContext } from 'react';
import { ColorContext } from './types';
export default createContext<ColorContext | null>(null);
