import 'hacker-ui';
import theme from './theme';

declare module 'hacker-ui' {
  export type Theme = typeof theme;
  export function useTheme(): Theme;
}
