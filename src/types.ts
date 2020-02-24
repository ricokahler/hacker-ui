export interface Theme {
  fonts: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    button: string;
    caption: string;
    subtitle1: string;
    subtitle2: string;
    body1: string;
    body2: string;
  };
  colors: {
    /**
     * the main brand color of your application
     */
    brand: string;
    accent: string;
    danger: string;
    warning: string;
    info: string;
    bland: string;
    surface: string;
  };
  durations: {
    short: number;
    standard: number;
    long: number;
  };
  shadows: {
    subtle: string;
    standard: string;
    emphasis: string;
  };

  // spacing units
  space: (n: number) => string;
  gap: (n: number) => string;
  block: (n: number) => string;

  // these were inspired from from material-ui's z-indexes
  zIndex: {
    appBar: number;
    drawer: number;
    modal: number;
    notification: number;
    tooltip: number;
  };

  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    desktopLarge: string;
    up: (value: string) => string;
    down: (value: string) => string;
    between: (min: string, max: string) => string;
  };
}

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

export interface ColorContext {
  color: string;
  on: string;
}

export interface TooltipProps {
  ref: React.Ref<any>;
  onMouseEnter: (e: React.MouseEvent<any>) => void;
  onMouseLeave: (e: React.MouseEvent<any>) => void;
}
