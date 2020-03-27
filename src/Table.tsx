import React from 'react';
import classNames from 'classnames';
import { readableColor } from 'polished';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme, givenSurface }) => ({
  // table base styles
  root: css`
    ${theme.fonts.body2}
    background-color: ${givenSurface};
    color: ${readableColor(givenSurface)};
    border-spacing: ${theme.space(0.5)};
    width: 100%;
    min-width: 500px;
    border-collapse: collapse;
    text-align: left;
    
    th, td {
      border-bottom: 1px solid ${theme.colors.bland};
      padding: ${theme.space(1)}
    }
  `,
  // variants
  contained: css`
    th,
    td {
      border: 1px solid ${theme.colors.bland};
    }
  `,
  striped: css`
    tbody tr:hover {
      background-color: rgba(41, 98, 255, 0.1);
    }
    tbody tr:nth-child(odd) {
      background-color: rgba(204, 204, 204, 0.2);
      :hover {
        background-color: rgba(41, 98, 255, 0.1);
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
}));

type TableProps = JSX.IntrinsicElements['table'];

type TableVariant = 'contained' | 'ghost' | 'outlined' | 'striped';

interface Props extends PropsFromStyles<typeof useStyles>, TableProps {
  children: React.ReactNode;
  variant?: TableVariant;
}

const Table = (props: Props) => {
  const { Root, styles, children, variant = 'outlined' } = useStyles(
    props,
    'table',
  );

  return (
    <Root
      className={classNames({
        [styles.contained]: variant === 'contained',
        [styles.striped]: variant === 'striped',
        [styles.ghost]: variant === 'ghost',
      })}
    >
      {children}
    </Root>
  );
};

export default Table;
