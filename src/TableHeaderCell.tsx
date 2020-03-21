import React from 'react';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  // table header cell base styles
  root: css``,
}));

type TableHeaderCellProps = JSX.IntrinsicElements['th'];

interface Props
  extends PropsFromStyles<typeof useStyles>,
    TableHeaderCellProps {
  children: React.ReactNode;
}

const TableHeaderCell = (props: Props) => {
  const { Root, children } = useStyles(props, 'th');
  return <Root>{children}</Root>;
};

export default TableHeaderCell;
