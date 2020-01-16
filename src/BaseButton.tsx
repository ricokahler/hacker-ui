// @pragma export
import React, { forwardRef } from 'react';
import createStyles, { StyleProps } from './createStyles';

const useStyles = createStyles(({ css, color }) => ({
  root: css``,
}));

type ButtonProps = JSX.IntrinsicElements['button'];

interface Props extends StyleProps<typeof useStyles>, ButtonProps {}

const Button = forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>) => {
  const { Root, styles, ...restOfProps } = useStyles(props, 'button');

  return <Root ref={ref} {...restOfProps} />;
});

export default Button;
