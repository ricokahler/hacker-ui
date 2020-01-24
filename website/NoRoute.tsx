import React from 'react';
import { createStyles, StyleProps } from 'hacker-ui';

const useStyles = createStyles(({ css }) => ({
  root: css``,
}));

interface Props extends StyleProps<typeof useStyles> {}

function NoRoute(props: Props) {
  const { Root, styles } = useStyles(props);

  return <Root>404 not found</Root>;
}

export default NoRoute;
