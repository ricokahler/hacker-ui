import React from 'react';
import { readableColor } from 'polished';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme, givenSurface }) => ({
  // table base styles
  root: css`
    ${theme.fonts.body2}
    margin: ${theme.space(1)} ${theme.space(0.5)};
    background-color: ${givenSurface};
    color: ${readableColor(givenSurface)};
    border-radius: ${theme.borderRadius};
    border-spacing: ${theme.space(0.5)};
    min-width: 500px;
    border-collapse: collapse;
    text-align: left;
    -webkit-box-shadow: 0px 2px 6px 0px ${theme.colors.bland};
    -moz-box-shadow: 0px 2px 6px 0px ${theme.colors.bland};
    box-shadow: 0px 2px 6px 0px ${theme.colors.bland};

    th, td {
      border-bottom: 1px solid ${theme.colors.bland};
      padding: ${theme.space(1)}
    }
  `,
}));

type TableProps = JSX.IntrinsicElements['table'];

type TableVariant = 'contained' | 'ghost' | 'outlined' | 'striped';

interface Props extends PropsFromStyles<typeof useStyles>, TableProps {
  children: React.ReactNode;
  variant?: TableVariant;
  hoverable?: boolean;
}

const Table = (props: Props) => {
  const { Root, children, variant = 'outlined', hoverable = true } = useStyles(
    props,
    'table',
  );

  return <Root>{children}</Root>;
};

export default Table;
