// @pragma export
import React, { forwardRef } from 'react';
import createStyles, { StyleProps } from './createStyles';

const useStyles = createStyles(({ css, theme, color }) => ({
  root: css`
    ${theme.fonts.button}
    color: ${color.onSurface};
    padding: ${theme.space(0.75)} ${theme.space(1)};
    appearance: none;
    outline: none;
    border: none;
    min-width: ${theme.block(1)};
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  `,
}));

type ButtonProps = JSX.IntrinsicElements['button'];

interface Props extends StyleProps<typeof useStyles>, ButtonProps {}

const Button = forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>) => {
  const { Root, styles, ...restOfProps } = useStyles(props, 'button');
  return <Root ref={ref} {...restOfProps} />;
});

export default Button;
