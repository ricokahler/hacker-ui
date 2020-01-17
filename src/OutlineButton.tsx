// @pragma export
import React, { forwardRef } from 'react';
import { transparentize } from 'polished';
import createStyles, { StyleProps } from './createStyles';
import BaseButton from './BaseButton';

const useStyles = createStyles(({ css, color, theme }) => ({
  root: css`
    border: 1px solid ${color.onSurface};
    color: ${color.onSurface};

    transition: background-color ${theme.durations.standard}ms,
      border ${theme.durations.standard}ms;

    &:focus {
      background-color: ${transparentize(0.92, color.asBackground)};
    }
    &:hover {
      background-color: ${transparentize(0.9, color.asBackground)};
    }
    &:active {
      background-color: ${transparentize(0.8, color.asBackground)};
    }
    &:disabled {
      color: ${transparentize(0.4, color.onSurface)};
      background-color: transparent;
    }
  `,
}));

type ButtonProps = JSX.IntrinsicElements['button'];
interface Props extends StyleProps<typeof useStyles>, ButtonProps {}

const OutlineButton = forwardRef(
  (props: Props, ref: React.Ref<HTMLButtonElement>) => {
    const { styles, Root, ...restOfProps } = useStyles(props, BaseButton);
    return <Root ref={ref as any} {...restOfProps} />;
  },
);

export default OutlineButton;
