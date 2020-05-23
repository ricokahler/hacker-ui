import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { readableColor, lighten } from 'polished';
import {
  createStyles,
  PropsFromStyles,
  useColorContext,
  ColorContextProvider,
} from 'react-style-system';

const useStyles = createStyles(({ css, theme, surface }) => ({
  // table base styles
  root: css`
    ${theme.body2}
    color: ${readableColor(surface)};
    border-spacing: ${theme.space(0.5)};
    width: 100%;
    min-width: 500px;
    border-collapse: collapse;
    text-align: left;
    
    th, td {
      background-color: ${surface};
      border-bottom: 1px solid ${theme.bland};
      padding: ${theme.space(1)}
    }
  `,
  // variants
  contained: css`
    th,
    td {
      border: 1px solid ${theme.bland};
    }
  `,
  striped: css`
    tbody tr:nth-child(odd) {
      th,
      td {
        background-color: ${lighten(0.15, theme.bland)};
      }
    }
    th,
    td {
      border: none;
    }
  `,
  ghost: css`
    th,
    td {
      border: none;
    }
  `,
  // Other props
  stickyFirstColumn: css`
    tr > :first-child {
      position: sticky;
      left: 0;
      z-index: 1;
    }
  `,
}));

type TableProps = JSX.IntrinsicElements['table'];

type TableVariant = 'contained' | 'ghost' | 'outlined' | 'striped';

interface Props extends PropsFromStyles<typeof useStyles>, TableProps {
  variant?: TableVariant;
  stickyFirstColumn?: boolean;
}

const Table = forwardRef((props: Props, ref: React.Ref<any>) => {
  const {
    Root,
    styles,
    variant = 'outlined',
    stickyFirstColumn = true,
    ...restOfProps
  } = useStyles(props, 'table');

  const { color, surface } = useColorContext(props);

  return (
    <ColorContextProvider color={color.original} surface={surface}>
      <Root
        className={classNames({
          [styles.contained]: variant === 'contained',
          [styles.striped]: variant === 'striped',
          [styles.ghost]: variant === 'ghost',
          [styles.stickyFirstColumn]: stickyFirstColumn,
        })}
        ref={ref}
        {...restOfProps}
      />
    </ColorContextProvider>
  );
});

Table.displayName = 'Table';

export default Table;
