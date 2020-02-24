import { CreateStyles } from 'react-style-system';
import { Theme } from './types';

declare module 'react-style-system' {
  export const createStyles: CreateStyles<Theme>;
  export function useTheme(): Theme;
}
