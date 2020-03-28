import React from 'react';
import classNames from 'classnames';
import { lighten } from 'polished';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme, color }) => ({
  // table row base styles
  root: css`
    > :first-child {
      min-width: 240px;
    }
  `,
  hoverableRow: css`
    :hover {
      th,
      td {
        background-color: ${lighten(0.35, color.asBackground)} !important;
        transition: background-color 0.2s;
      }
    }
  `,
  stickyFirstColumn: css`
    > :first-child {
      position: sticky;
      left: 0;
      z-index: 1;
    }
  `,
}));

type TableRowProps = JSX.IntrinsicElements['tr'];

interface Props extends PropsFromStyles<typeof useStyles>, TableRowProps {
  children: React.ReactNode;
  hoverable?: boolean;
  stickyFirstColumn?: boolean;
}

const TableRow = (props: Props) => {
  const {
    Root,
    styles,
    children,
    hoverable = false,
    stickyFirstColumn = true,
  } = useStyles(props, 'tr');
  return (
    <Root
      className={classNames({
        [styles.hoverableRow]: hoverable,
        [styles.stickyFirstColumn]: stickyFirstColumn,
      })}
    >
      {children}
    </Root>
  );
};

export default TableRow;
