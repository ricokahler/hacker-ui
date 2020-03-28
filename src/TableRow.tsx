import React, { forwardRef } from 'react';
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
}));

type TableRowProps = JSX.IntrinsicElements['tr'];

interface Props extends PropsFromStyles<typeof useStyles>, TableRowProps {
  hoverable?: boolean;
}

const TableRow = forwardRef((props: Props, ref: React.Ref<any>) => {
  const { Root, styles, hoverable = false, ...restOfProps } = useStyles(
    props,
    'tr',
  );
  return (
    <Root
      className={classNames({
        [styles.hoverableRow]: hoverable,
      })}
      ref={ref}
      {...restOfProps}
    />
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
