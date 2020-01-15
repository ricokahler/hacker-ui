export interface Theme {
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
}

export interface DynamicColorPalette {
  asBackground: string;
  onSurface: string;
  bgContrast: string;
}
