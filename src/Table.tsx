import React from 'react';
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
    min-width: 500px;
    border-collapse: collapse;
    text-align: left;
    
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
}

const Table = (props: Props) => {
  const { Root, children, variant = 'outlined' } = useStyles(props, 'table');

  return <Root>{children}</Root>;
};

export default Table;
