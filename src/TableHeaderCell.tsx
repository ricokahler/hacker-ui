import React, { forwardRef } from 'react';
import { createStyles, PropsFromStyles } from 'react-style-system';

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
    TableHeaderCellProps {}

const TableHeaderCell = forwardRef((props: Props, ref: React.Ref<any>) => {
  const { Root, styles, ...restOfProps } = useStyles(props, 'th');
  return <Root ref={ref} {...restOfProps} />;
});

TableHeaderCell.displayName = 'TableHeaderCell';

export default TableHeaderCell;
