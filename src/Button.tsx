import React, { forwardRef } from 'react';
import classNames from 'classnames';
import {
  createStyles,
  PropsFromStyles,
  readableColor,
  mix,
  transparentize,
} from 'react-style-system';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color, surface }) => {
  const mixWithSurface = (color: string, amount: number) =>
    mix(color, surface, amount);

  return {
    // button base styles
    root: css`
      ${theme.button};

      display: inline-flex;
      justify-content: center;
      align-items: center;

      appearance: none;
      outline: none;
      background: transparent;
      border: none;
      border-radius: ${theme.borderRadius};
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
      & > svg {
        width: ${theme.space(1.25)};
        height: ${theme.space(1.25)};
      }
    `,
    // variants
    outlined: css`
      border: 1px solid ${color.readable};
      color: ${color.readable};

      transition: background-color ${theme.duration.standard},
        border ${theme.duration.standard};

      &:focus {
        background-color: ${mixWithSurface(color.decorative, 0.92)};
      }
      &:hover {
        background-color: ${mixWithSurface(color.decorative, 0.9)};
      }
      &:active {
        background-color: ${mixWithSurface(color.decorative, 0.8)};
      }
      &:disabled {
        color: ${mixWithSurface(color.readable, 0.4)};
        background-color: transparent;
      }
    `,
    filled: css`
      background-color: ${color.decorative};
      color: ${readableColor(color.decorative)} !important;
      border: 2px solid transparent;
      transition: background-color ${theme.duration.standard},
        border ${theme.duration.standard};

      &:focus {
        background-color: ${mixWithSurface(color.decorative, 0.18)};
        border: 2px solid ${transparentize('#fff', 0.7)};
      }
      &:hover {
        background-color: ${mixWithSurface(color.decorative, 0.23)};
      }
      &:active {
        background-color: ${mixWithSurface(color.decorative, 0.3)};
        border: 2px solid ${transparentize('#fff', 0.5)};
      }
      &:disabled {
        background-color: ${mixWithSurface(color.decorative, 0.5)};
        border: 2px solid transparent;
        color: ${mixWithSurface(readableColor(color.decorative), 0.2)};
      }
    `,
    ghost: css`
      color: ${color.readable};
      border: 2px solid transparent;
      transition: background-color ${theme.duration.standard},
        border ${theme.duration.standard};

      &:focus {
        background-color: ${mixWithSurface(color.decorative, 0.92)};
        border: 2px solid
          ${transparentize(readableColor(color.decorative), 0.8)};
      }
      &:hover {
        background-color: ${mixWithSurface(color.decorative, 0.9)};
      }
      &:active {
        background-color: ${mixWithSurface(color.decorative, 0.8)};
      }
      &:disabled {
        color: ${mixWithSurface(color.readable, 0.4)};
      background-color: transparent;
      }
    `,
    // sizes
    standardSmall: css`
      padding: ${theme.space(0.5)} ${theme.space(0.75)};
      min-width: ${theme.block(0.75)};
    `,
    standardStandard: css`
      padding: ${theme.space(0.75)} ${theme.space(1)};
      min-width: ${theme.block(1)};
    `,
    standardLarge: css`
      padding: ${theme.space(1)} ${theme.space(1.25)};
      min-width: ${theme.block(1.5)};
      font-size: 0.8rem;
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
  };
});

type ButtonProps = JSX.IntrinsicElements['button'];
interface Props extends PropsFromStyles<typeof useStyles>, ButtonProps {
  size?: 'small' | 'standard' | 'large';
  shape?: 'standard' | 'icon';
  variant?: 'filled' | 'ghost' | 'outlined';
  component?: ReactComponent;
}

const Button = forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>) => {
  const {
    Root,
    styles,
    component,
    variant = 'ghost',
    size = 'standard',
    shape = 'standard',
    ...restOfProps
  } = useStyles(props, props.component || 'button');

  return (
    <Root
      className={classNames('hui-button', {
        [styles.icon]: shape === 'icon',
        [styles.standard]: shape === 'standard',
        [styles.outlined]: variant === 'outlined',
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

Button.displayName = 'Button';

export default Button;
