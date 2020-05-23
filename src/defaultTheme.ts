import { css } from 'react-style-system';
import { math } from 'polished';
import { readableColorIsBlack } from 'react-style-system';

const defaultTheme = {
  // responsive helpers
  up: (value: string) => `@media (min-width: ${math(`${value} + 1px`)})`,
  down: (value: string) => `@media (max-width: ${value})`,
  between: (min: string, max: string) =>
    `@media (max-width: ${min}) and (min-width: ${math(`${max} - 1px`)})`,

  // breakpoints
  mobile: '375px',
  tablet: '768px',
  desktop: '1024px',
  desktopLarge: '1440px',

  // non-responsive font-sizes
  fontStatic: {
    h1: css`
      font-size: 96px;
      font-weight: bold;
      margin: 0;
    `,
    h2: css`
      font-size: 60px;
      font-weight: bold;
      margin: 0;
    `,
    h3: css`
      font-size: 48px;
      font-weight: bold;
      margin: 0;
    `,
    h4: css`
      font-size: 34px;
      font-weight: bold;
      margin: 0;
    `,
    h5: css`
      font-size: 24px;
      font-weight: bold;
      margin: 0;
    `,
    h6: css`
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    `,
    subtitle1: css`
      font-size: 16px;
      margin: 0;
    `,
    subtitle2: css`
      font-size: 14px;
      font-weight: bold;
      margin: 0;
    `,
    body1: css`
      font-size: 18px;
      line-height: 1.7;
      margin: 0;
    `,
    body2: css`
      font-size: 14px;
      margin: 0;
    `,
    button: css`
      font-size: 0.75em;
      font-weight: bold;
      text-transform: uppercase;
      margin: 0;
    `,
    caption: css`
      font-size: 12px;
    `,
    overline: css`
      font-size: 10px;
      font-weight: 300;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    `,
  },

  // responsive/default font-sizes
  get h1() {
    return css`
      ${this.fontStatic.h1},
      ${this.down(this.tablet)} {
        ${this.fontStatic.h2};
      }
    `;
  },
  get h2() {
    return css`
      ${this.fontStatic.h2},
      ${this.down(this.tablet)} {
        ${this.fontStatic.h3};
      }
    `;
  },
  get h3() {
    return css`
      ${this.fontStatic.h3},
      ${this.down(this.tablet)} {
        ${this.fontStatic.h4};
      }
    `;
  },
  get h4() {
    return css`
      ${this.fontStatic.h4},
      ${this.down(this.tablet)} {
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
    return this.fontStatic.body1;
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
  surface: '#fff',
  brand: '#000',
  accent: '#2962ff',
  danger: '#eb002b',
  warning: '#f56200',
  info: '#2962ff',
  get bland() {
    return readableColorIsBlack(this.surface) ? '#ddd' : '#222';
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
