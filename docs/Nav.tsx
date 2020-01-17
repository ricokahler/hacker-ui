import React from 'react';
import { createStyles, StyleProps } from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    width: ${theme.block(3)};
    background-color: #f6f6f6;
  `,
}));

interface Props extends StyleProps<typeof useStyles> {}

function Nav(props: Props) {
  const { Root, styles } = useStyles(props);

  return <Root>nav</Root>;
}

export default Nav;
