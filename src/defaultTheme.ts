import { Theme } from './types';
import css from './css';

const defaultTheme: Theme = {
  fonts: {
    button: css`
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
      margin: 0;
    `,
    caption: css`
      font-size: 0.8rem;
      margin: 0;
    `,
    h1: css`
      font-size: 160px;
      font-weight: bold;
      margin: 0;
    `,
    h2: css`
      font-size: 100px;
      font-weight: bold;
      margin: 0;
    `,
    h3: css`
      font-size: 60px;
      font-weight: bold;
      margin: 0;
    `,
    h4: css`
      font-size: 24px;
      font-weight: bold;
      line-height: 1.5;
      margin: 0;
    `,
    h5: css`
      font-size: 16px;
      font-weight: bold;
      line-height: 1.5;
      margin: 0;
    `,
    subtitle1: css`
      font-size: 60px;
      font-weight: bold;
      color: #444;
      margin: 0;
    `,
    subtitle2: css`
      font-size: 24px;
      font-weight: bold;
      color: #444;
      margin: 0;
    `,
    body1: css`
      font-weight: 400;
      text-transform: none;
      font-size: 16px;
      margin: 0;
      line-height: 1.5;
    `,
    body2: css`
      font-weight: 400;
      text-transform: none;
      font-size: 16px;
      margin: 0;
      color: #444;
    `,
  },
  colors: {
    brand: '#000',
    accent: '#2962ff',
    bland: '#ccc',
    danger: '#eb002b',
    warning: '#f56200',
    info: '#2962ff',
    surface: '#fff',
  },
  durations: {
    short: 100,
    standard: 250,
    long: 500,
  },
  shadows: {
    subtle: '0 0 10px 0 rgba(0,0,0,0.10)',
    standard: '0 0 20px 0 rgba(0,0,0,0.13)',
    emphasis: '0 0 30px 0 rgba(0,0,0,0.13)',
  },
  space: n => `${n * 16}px`,
  gap: n => `${n * 48}px`,
  block: n => `${n * 96}px`,
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    notification: 1400,
    tooltip: 1500,
  },
  breakpoints: {
    mobile: 375,
    tablet: 768,
    desktop: 1024,
    desktopLarge: 1440,
  },
};

export default defaultTheme;
