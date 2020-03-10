import { Theme } from './types';

declare module 'react-style-system' {
  export const createStyles: (styleFn: (t: any) => any) => any;
  export function useTheme(): Theme;
}
