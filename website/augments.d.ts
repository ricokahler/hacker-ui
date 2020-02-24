import { Theme } from 'hacker-ui';
// import { CreateStyles } from 'react-style-system';

declare module 'hacker-ui' {
  // TODO:
  // export const createStyles: CreateStyles<Theme>;
  export function useTheme(): Theme;
}
