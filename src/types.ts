export type PropsOf<T> = T extends React.ComponentType<infer U> ? U : never;

export type ReactComponent =
  | React.ComponentType<any>
  | keyof JSX.IntrinsicElements
  | string;

export interface FormControlContext {
  id: string;
  focused: boolean;
  setFocused: (isFocused: boolean) => void;
  hasError: boolean;
  disabled: boolean;
}

export interface RadioGroupContext {
  name: string;
  value: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TooltipProps {
  ref: React.Ref<any>;
  onMouseEnter: (e: React.MouseEvent<any>) => void;
  onMouseLeave: (e: React.MouseEvent<any>) => void;
}

export type { DefaultTheme } from './defaultTheme';
