import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from './BaseButton';
import ThemeProvider from './ThemeProvider';
import createTheme from './createTheme';
import createStyles, { StyleProps } from './createStyles';

const theme = createTheme();

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    padding: ${theme.gap(1)};
  `,
  buttons: css``,
}));

interface Props extends StyleProps<typeof useStyles> {}

function Demo(props: Props) {
  const { styles, Root } = useStyles(props);

  return (
    <Root>
      <div className={styles.buttons}>
        <Button>Okay</Button>
      </div>
    </Root>
  );
}

export const Example = () => (
  <ThemeProvider theme={theme}>
    <Demo />
  </ThemeProvider>
);

export default {
  component: Button,
  title: 'Button',
};
