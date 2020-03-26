import React from 'react';
import classNames from 'classnames';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  // table row base styles
  root: css`
    > :first-child {
      min-width: 240px;
    }
  `,
  hoverableRow: css`
    :hover {
      background-color: rgba(204, 204, 204, 0.2);
      transition: background-color 0.4s;
    }
  `,
}));

type TableRowProps = JSX.IntrinsicElements['tr'];

interface Props extends PropsFromStyles<typeof useStyles>, TableRowProps {
  children: React.ReactNode;
  hoverable?: boolean;
}

const TableRow = (props: Props) => {
  const { Root, styles, children, hoverable = false } = useStyles(props, 'tr');
  return (
    <Root className={classNames({ [styles.hoverableRow]: hoverable })}>
      {children}
    </Root>
  );
};

export default TableRow;
