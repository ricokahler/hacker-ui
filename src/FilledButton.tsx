// @pragma export
import React, { forwardRef } from 'react';
import { transparentize } from 'polished';
import BaseButton from './BaseButton';
import createStyles, {
  PropsFromStyles,
  PropsFromComponent,
} from './createStyles';

const useStyles = createStyles(({ css, theme, color }) => ({
  root: css`
    background-color: ${color.asBackground};
    color: ${color.bgContrast};
    border: 2px solid transparent;
    transition: background-color ${theme.durations.standard}ms,
      border ${theme.durations.standard}ms;

    &:focus {
      background-color: ${transparentize(0.18, color.asBackground)};
      border: 2px solid ${transparentize(0.7, '#fff')};
    }
    &:hover {
      background-color: ${transparentize(0.23, color.asBackground)};
    }
    &:active {
      background-color: ${transparentize(0.3, color.asBackground)};
      border: 2px solid ${transparentize(0.5, '#fff')};
    }
    &:disabled {
      background-color: ${transparentize(0.5, color.asBackground)};
      border: 2px solid transparent;
      color: ${transparentize(0.2, color.bgContrast)};
    }
  `,
}));

interface Props
  extends PropsFromStyles<typeof useStyles>,
    PropsFromComponent<typeof BaseButton> {}

const FilledButton = forwardRef(
  (props: Props, ref: React.Ref<HTMLButtonElement>) => {
    const { Root, styles, ...restOfProps } = useStyles(props, BaseButton);
    return <Root ref={ref as any} {...restOfProps} />;
  },
);

export default FilledButton;
