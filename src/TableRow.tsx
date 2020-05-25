import React, { forwardRef } from 'react';
import classNames from 'classnames';
import {
  createStyles,
  PropsFromStyles,
  transparentize,
} from 'react-style-system';

const useStyles = createStyles(({ css, color }) => ({
  // table row base styles
  root: css`
    > :first-child {
      min-width: 240px;
    }
  `,
  hoverable: css`
    :hover {
      th,
      td {
        background-color: ${transparentize(color.decorative, 0.65)} !important;
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
        [styles.hoverable]: hoverable,
      })}
      ref={ref}
      {...restOfProps}
    />
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
