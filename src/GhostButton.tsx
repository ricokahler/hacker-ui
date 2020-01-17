// @pragma export
import React, { forwardRef } from 'react';
import { transparentize } from 'polished';
import createStyles, {
  PropsFromStyles,
  PropsFromComponent,
} from './createStyles';
import BaseButton from './BaseButton';

const useStyles = createStyles(({ css, theme, color }) => ({
  root: css`
    color: ${color.onSurface};
    border: 2px solid transparent;
    transition: background-color ${theme.durations.standard}ms,
      border ${theme.durations.standard}ms;

    &:focus {
      background-color: ${transparentize(0.92, color.asBackground)};
      border: 2px solid ${transparentize(0.8, color.bgContrast)};
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

interface Props
  extends PropsFromStyles<typeof useStyles>,
    PropsFromComponent<typeof BaseButton> {}

const GhostButton = forwardRef(
  (props: Props, ref: React.Ref<HTMLButtonElement>) => {
    const { Root, styles, ...restOfProps } = useStyles(props, BaseButton);

    return <Root ref={ref} {...restOfProps} />;
  },
);

export default GhostButton;
