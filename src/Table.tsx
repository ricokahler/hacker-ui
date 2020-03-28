import React from 'react';
import classNames from 'classnames';
import { readableColor, lighten } from 'polished';
import createStyles from './createStyles';
import ColorProvider from './ColorProvider';
import useTheme from './useTheme';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme, givenSurface }) => ({
  // table base styles
  root: css`
    ${theme.fonts.body2}
    color: ${readableColor(givenSurface)};
    border-spacing: ${theme.space(0.5)};
    width: 100%;
    min-width: 500px;
    border-collapse: collapse;
    text-align: left;
    
    th, td {
      background-color: ${givenSurface};
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
    tbody tr:nth-child(odd) {
      th,
      td {
        background-color: ${lighten(0.15, theme.colors.bland)};
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

  const theme = useTheme();
  const color = props.color || theme.colors.accent;
  const on = props.on || theme.colors.surface;

  return (
    <ColorProvider color={color} on={on}>
      <Root
        className={classNames({
          [styles.contained]: variant === 'contained',
          [styles.striped]: variant === 'striped',
          [styles.ghost]: variant === 'ghost',
        })}
      >
        {children}
      </Root>
    </ColorProvider>
  );
};

export default Table;
