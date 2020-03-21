import React from 'react';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  // table body cell base styles
  root: css``,
}));

type TableBodyCellProps = JSX.IntrinsicElements['td'];

interface Props extends PropsFromStyles<typeof useStyles>, TableBodyCellProps {
  children: React.ReactNode;
}

const TableBodyCell = (props: Props) => {
  const { Root, children } = useStyles(props, 'td');
  return <Root>{children}</Root>;
};

export default TableBodyCell;
