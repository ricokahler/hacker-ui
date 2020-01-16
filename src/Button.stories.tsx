import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from './Button';
import createStyles from './createStyles';
import ThemeProvider from './ThemeProvider';
import createTheme from './createTheme';
const theme = createTheme();

const useStyles = createStyles(css => ({
  button: css`
    background-color: red;
  `,
}));

export default {
  component: Button,
  title: 'Button',
};

export const test = () => {
  return (
    <ThemeProvider theme={theme}>
      <Example />
    </ThemeProvider>
  );
};

const Example = (props: any) => {
  const { styles } = useStyles(props);
  return (
    <Button className={styles.button} onClick={action('clicked')}>
      Hello Button
    </Button>
  );
};

export const emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
