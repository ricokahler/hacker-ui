import React, { forwardRef } from 'react';
import useTheme from './useTheme';
import createStyles from './createStyles';
import { PropsFromStyles, PropsFromComponent } from './types';
import Button from './Button';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    ${theme.fonts.body1}
    align-items: flex-start;
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
}));

interface Props
  extends PropsFromStyles<typeof useStyles>,
    PropsFromComponent<typeof Button> {}

const ListItemButton = forwardRef(
  (props: Props, ref: React.Ref<HTMLButtonElement>) => {
    const theme = useTheme();
    const { Root, styles, ...restOfProps } = useStyles(props, Button);

    return (
      <Root
        ref={ref}
        variant="ghost"
        color={theme.colors.bland}
        {...restOfProps}
      />
    );
  },
);

export default ListItemButton;
