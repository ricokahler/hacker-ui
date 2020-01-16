import React, { forwardRef } from 'react';
import makeStyles, { StyleProps } from './makeStyles';

const useStyles = makeStyles(color => ({
  root: '',
}));

type ButtonProps = JSX.IntrinsicElements['button'];

interface Props extends StyleProps<typeof useStyles>, ButtonProps {}

const Button = forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>) => {
  const { Root, styles, ...restOfProps } = useStyles(props, 'button');

  return <Root {...restOfProps} />;
});

export default Button;
