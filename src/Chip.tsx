import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { transparentize, readableColor } from 'polished';
import {
  createStyles,
  ColorContextProvider,
  useColorContext,
  useTheme,
  PropsFromStyles,
} from 'react-style-system';
import { ReactComponent, Theme } from './types';

const useStyles = createStyles(({ css, theme, color }) => ({
  // button base styles
  root: css`
    ${theme.fonts.caption}
    font-weight: bold;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    appearance: none;
    outline: none;
    background: transparent;
    border: none;
    text-decoration: none;
    border-radius: 999999px;
    min-height: 34px;

    &:disabled {
      cursor: not-allowed;
    }

    padding: ${theme.space(0.5)} ${theme.space(0.75)};

    & > *:not(:last-child) {
      margin-right: ${theme.space(0.5)};
    }

    & > .hui-button {
      margin-top: -${theme.space(0.5)};
      margin-bottom: -${theme.space(0.5)};
      margin-right: -${theme.space(0.75)};
      margin-left: -${theme.space(0.25)};
    }
  `,
  // variants
  outlined: css`
    border: 1px solid ${color.readable};
    color: ${color.readable};

    transition: background-color ${theme.durations.standard}ms,
      border ${theme.durations.standard}ms;

    &:disabled {
      &,
      &:hover,
      &:focus {
        color: ${transparentize(0.4, color.readable)};
        background-color: transparent;
      }
    }
  `,
  outlinedClickable: css`
    cursor: pointer;
    &:focus {
      background-color: ${transparentize(0.92, color.decorative)};
    }
    &:hover {
      background-color: ${transparentize(0.9, color.decorative)};
    }
    &:active {
      background-color: ${transparentize(0.8, color.decorative)};
    }
  `,
  filled: css`
    background-color: ${color.decorative};
    color: ${readableColor(color.decorative)};
    border: 2px solid transparent;
    transition: background-color ${theme.durations.standard}ms,
      border ${theme.durations.standard}ms;

    &:disabled {
      background-color: ${transparentize(0.5, color.decorative)};
      border: 2px solid transparent;
      color: ${transparentize(0.2, readableColor(color.decorative))};
    }
  `,
  filledClickable: css`
    cursor: pointer;
    &:focus {
      background-color: ${transparentize(0.18, color.decorative)};
      border: 2px solid ${transparentize(0.7, '#fff')};
    }
    &:hover {
      background-color: ${transparentize(0.23, color.decorative)};
    }
    &:active {
      background-color: ${transparentize(0.3, color.decorative)};
      border: 2px solid ${transparentize(0.5, '#fff')};
    }
  `,
}));

type ButtonProps = JSX.IntrinsicElements['button'];
interface Props extends PropsFromStyles<typeof useStyles>, ButtonProps {
  variant?: 'filled' | 'outlined';
  active?: boolean;
  component?: ReactComponent;
  clickable?: boolean;
}

const Chip = forwardRef((props: Props, ref: React.Ref<any>) => {
  const component = (props.component ?? props.clickable
    ? 'button'
    : 'div') as ReactComponent;

  const {
    Root,
    styles,
    component: _component,
    clickable,
    variant = 'outlined',
    ...restOfProps
  } = useStyles(props, component);

  const theme = useTheme<Theme>();
  const colorContext = useColorContext();

  let color = props.color ?? colorContext?.surface ?? theme.colors.accent;
  let surface = props.surface ?? colorContext?.surface ?? theme.colors.surface;

  if (variant === 'filled') {
    surface = color;
  }

  return (
    <ColorContextProvider surface={surface} color={color}>
      <Root
        className={classNames({
          [styles.outlined]: variant === 'outlined',
          [styles.outlinedClickable]: variant === 'outlined' && clickable,
          [styles.filled]: variant === 'filled',
          [styles.filledClickable]: variant === 'filled' && clickable,
        })}
        ref={ref}
        {...restOfProps}
      />
    </ColorContextProvider>
  );
});

export default Chip;
