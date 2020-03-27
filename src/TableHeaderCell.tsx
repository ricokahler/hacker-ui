import React from 'react';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  // table header cell base styles
  root: css`
    font-weight: normal;
    min-width: 120px;
  `,
}));

type TableHeaderCellProps = JSX.IntrinsicElements['th'];

interface Props
  extends PropsFromStyles<typeof useStyles>,
    TableHeaderCellProps {
  children: React.ReactNode;
  colSpan?: number;
}

const TableHeaderCell = (props: Props) => {
  const { Root, children, colSpan = 1 } = useStyles(props, 'th');
  return <Root colSpan={colSpan}>{children}</Root>;
};

export default TableHeaderCell;
