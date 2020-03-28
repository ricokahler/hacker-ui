import React, { forwardRef } from 'react';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  // table body cell base styles
  root: css``,
}));

type TableBodyCellProps = JSX.IntrinsicElements['td'];

interface Props extends PropsFromStyles<typeof useStyles>, TableBodyCellProps {}

const TableBodyCell = forwardRef((props: Props, ref: React.Ref<any>) => {
  const { Root, styles, ...restOfProps } = useStyles(props, 'td');
  return <Root ref={ref} {...restOfProps} />;
});

TableBodyCell.displayName = 'TableBodyCell';

export default TableBodyCell;
