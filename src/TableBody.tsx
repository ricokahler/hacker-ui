import React from 'react';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  // table body base styles
  root: css``,
}));

type TableBodyProps = JSX.IntrinsicElements['tbody'];

interface Props extends PropsFromStyles<typeof useStyles>, TableBodyProps {
  children: React.ReactNode;
}

const TableBody = (props: Props) => {
  const { Root, children } = useStyles(props, 'tbody');
  return <Root>{children}</Root>;
};

export default TableBody;
