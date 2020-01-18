// @pragma export
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { transparentize } from 'polished';
import createStyles, { PropsFromStyles } from './createStyles';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color }) => ({
  // button base styles
  root: css`
    ${theme.fonts.button}

    display: inline-flex;
    justify-content: center;
    align-items: center;

    appearance: none;
    outline: none;
    background: transparent;
    border: none;
    text-decoration: none;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  `,
  // shapes
  standard: css`
    min-width: ${theme.block(1)};

    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
  icon: css`
    border-radius: 99999px;
  `,
  // variants
  outline: css`
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
  filled: css`
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
  ghost: css`
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
  // sizes
  standardSmall: css`
    padding: ${theme.space(0.5)} ${theme.space(0.75)};
    min-width: ${theme.block(1)};
  `,
  standardStandard: css`
    padding: ${theme.space(0.75)} ${theme.space(1)};
    min-width: ${theme.block(1)};
  `,
  standardLarge: css`
    padding: ${theme.space(1)} ${theme.space(1.25)};
    min-width: ${theme.block(1.5)};
  `,
  iconSmall: css`
    width: ${theme.space(2)};
    height: ${theme.space(2)};
  `,
  iconStandard: css`
    width: ${theme.space(2.5)};
    height: ${theme.space(2.5)};
  `,
  iconLarge: css`
    width: ${theme.space(3)};
    height: ${theme.space(3)};
  `,
}));

type ButtonProps = JSX.IntrinsicElements['button'];

interface Props extends PropsFromStyles<typeof useStyles>, ButtonProps {
  size?: 'small' | 'standard' | 'large';
  shape?: 'standard' | 'icon';
  variant?: 'filled' | 'ghost' | 'outline';
  component?: ReactComponent;
}

const Button = forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>) => {
  const {
    Root,
    styles,
    component,
    variant = 'filled',
    size = 'standard',
    shape = 'standard',
    ...restOfProps
  } = useStyles(props, props.component || 'button');
  return (
    <Root
      className={classNames({
        [styles.icon]: shape === 'icon',
        [styles.standard]: shape === 'standard',
        [styles.outline]: variant === 'outline',
        [styles.ghost]: variant === 'ghost',
        [styles.filled]: variant === 'filled',
        [styles.iconSmall]: shape === 'icon' && size === 'small',
        [styles.iconStandard]: shape === 'icon' && size === 'standard',
        [styles.iconLarge]: shape === 'icon' && size === 'large',
        [styles.standardSmall]: shape === 'standard' && size === 'small',
        [styles.standardStandard]: shape === 'standard' && size === 'standard',
        [styles.standardLarge]: shape === 'standard' && size === 'large',
      })}
      ref={ref}
      {...restOfProps}
    />
  );
});

export default Button;
