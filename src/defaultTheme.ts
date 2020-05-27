import { css } from 'react-style-system';
import { readableColorIsBlack, lighten } from 'react-style-system';

const parsePx = (value: string) => {
  const match = value.match(/([\d.]+)px.*/i);
  if (!match) {
    throw new Error(`Expected value to have px units. Got: "${value}"`);
  }
  return parseFloat(match[1]);
};

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'desktopLarge';

const defaultTheme = {
  // media queries
  media: {
    up(value: Breakpoint) {
      console.log('this value', this[value]);
      return `@media (min-width: ${parsePx(this[value]) + 1}px)`;
    },
    down(value: Breakpoint) {
      console.log('this value', this[value]);
      return `@media (max-width: ${this[value]})`;
    },
    between(min: Breakpoint, max: Breakpoint) {
      return `@media (max-width: ${this[min]}) and (min-width: ${
        parsePx(this[max]) + 1
      }px)`;
    },
    mobile: '425px',
    tablet: '768px',
    desktop: '1024px',
    desktopLarge: '1440px',
  },

  // non-responsive font-sizes
  fontStatic: {
    h1: css`
      font-size: 144px;
      letter-spacing: -3px;
      font-weight: bold;
      text-transform: none;
      margin: 0;
    `,
    h2: css`
      font-size: 96px;
      letter-spacing: -2px;
      font-weight: bold;
      text-transform: none;
      margin: 0;
    `,
    h3: css`
      font-size: 60px;
      letter-spacing: -0.3px;
      font-weight: bold;
      text-transform: none;
      margin: 0;
    `,
    h4: css`
      font-size: 42px;
      letter-spacing: -0.3px;
      font-weight: bold;
      text-transform: none;
      margin: 0;
    `,
    h5: css`
      font-size: 28px;
      letter-spacing: -0.3px;
      font-weight: bold;
      text-transform: none;
      margin: 0;
    `,
    h6: css`
      font-size: 18px;
      font-weight: bold;
      text-transform: none;
      margin: 0;
    `,
    subtitle1: css`
      font-size: 16px;
      text-transform: none;
      margin: 0;
    `,
    subtitle2: css`
      font-size: 14px;
      font-weight: bold;
      text-transform: none;
      margin: 0;
    `,
    body1: css`
      font-size: 18px;
      line-height: 1.6;
      text-transform: none;
      font-weight: 400;
      margin: 0;
    `,
    body2: css`
      font-size: 16px;
      text-transform: none;
      line-height: 1.5;
      font-weight: 400;
      margin: 0;
    `,
    button: css`
      font-size: 0.75em;
      font-weight: bold;
      text-transform: uppercase;
      margin: 0;
    `,
    caption: css`
      font-size: 14px;
      font-weight: normal;
      text-transform: none;
      margin: 0;
    `,
    overline: css`
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 0;
    `,
  },

  weight: {
    light: 300 as 300,
    normal: 400 as 400,
    semiBold: 600 as 600,
    bold: 700 as 700,
    black: 900 as 900,
  },

  // responsive/default font-sizes
  get h1() {
    return css`
      ${this.fontStatic.h1};
      ${this.media.down('tablet')} {
        ${this.fontStatic.h2};
      }
    `;
  },
  get h2() {
    return css`
      ${this.fontStatic.h2};
      ${this.media.down('tablet')} {
        ${this.fontStatic.h3};
      }
    `;
  },
  get h3() {
    return css`
      ${this.fontStatic.h3};
      ${this.media.down('tablet')} {
        ${this.fontStatic.h4};
      }
    `;
  },
  get h4() {
    return css`
      ${this.fontStatic.h4};
      ${this.media.down('tablet')} {
        ${this.fontStatic.h5};
      }
    `;
  },
  get h5() {
    return this.fontStatic.h5;
  },
  get h6() {
    return this.fontStatic.h6;
  },
  get subtitle1() {
    return this.fontStatic.subtitle1;
  },
  get subtitle2() {
    return this.fontStatic.subtitle2;
  },
  get body1() {
    return css`
      ${this.fontStatic.body1};
      ${this.media.down('mobile')} {
        ${this.fontStatic.body2};
      }
    `;
  },
  get body2() {
    return this.fontStatic.body2;
  },
  get caption() {
    return this.fontStatic.caption;
  },
  get button() {
    return this.fontStatic.button;
  },
  get overline() {
    return this.fontStatic.overline;
  },

  // colors
  surface: '#fff',
  brand: '#000',
  get accent() {
    const accent = '#2962ff';
    return readableColorIsBlack(this.surface) ? accent : lighten(accent, 0.2);
  },
  danger: '#eb002b',
  warning: '#f56200',
  get bland() {
    return readableColorIsBlack(this.surface) ? '#ccc' : '#555';
  },

  // z-indexes
  zIndex: {
    appBar: 1100 as 1100,
    drawer: 1200 as 1200,
    modal: 1300 as 1300,
    notification: 1400 as 1400,
    tooltip: 1500 as 1500,
  },

  // border-radius
  borderRadius: '2px',

  // spacing unit helpers
  space: (n: number) => `${n * 16}px`,
  gap: (n: number) => `${n * 48}px`,
  block: (n: number) => `${n * 96}px`,

  // durations
  duration: {
    short: '100ms',
    standard: '250ms',
    long: '500ms',
  },

  // shadows
  shadows: {
    subtle: '0 0 10px 0 rgba(0,0,0,0.10)',
    standard: '0 0 20px 0 rgba(0,0,0,0.13)',
    emphasis: '0 0 30px 0 rgba(0,0,0,0.13)',
  },
};

export type DefaultTheme = typeof defaultTheme;

export default defaultTheme;
