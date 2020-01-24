import React from 'react';
import { createStyles, StyleProps } from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    padding: ${theme.space(1)};
    box-shadow: ${theme.shadows.standard};
    height: ${theme.block(0.75)};
  `,
  title: css``,
}));

interface Props extends StyleProps<typeof useStyles> {}

function AppBar(props: Props) {
  const { Root, styles } = useStyles(props);

  return <Root></Root>;
}

export default AppBar;
