import React, { forwardRef } from 'react';
import {
  createStyles,
  PropsFromStyles,
  useTheme,
  PropsFromComponent,
} from 'react-style-system';
import { Theme } from './types';
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
    const theme = useTheme<Theme>();
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
