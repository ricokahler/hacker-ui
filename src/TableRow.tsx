import React from 'react';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  // table row base styles
  root: css`
    > :first-child {
      min-width: 240px;
    }
  `,
}));

type TableRowProps = JSX.IntrinsicElements['tr'];

interface Props extends PropsFromStyles<typeof useStyles>, TableRowProps {
  children: React.ReactNode;
}

const TableRow = (props: Props) => {
  const { Root, children } = useStyles(props, 'tr');
  return <Root>{children}</Root>;
};

export default TableRow;
