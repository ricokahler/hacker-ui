import React from 'react';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  // table head base styles
  root: css`
    th {
      font-weight: 600;
    }
  `,
}));

type TableHeadProps = JSX.IntrinsicElements['thead'];

interface Props extends PropsFromStyles<typeof useStyles>, TableHeadProps {
  children: React.ReactNode;
}

const TableHead = (props: Props) => {
  const { Root, children } = useStyles(props, 'thead');
  return <Root>{children}</Root>;
};

export default TableHead;
