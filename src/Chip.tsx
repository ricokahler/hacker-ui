import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { transparentize } from 'polished';
import createStyles from './createStyles';
import { ReactComponent, PropsFromStyles } from './types';
import ColorProvider from './ColorProvider';
import useColorContext from './useColorContext';
import useTheme from './useTheme';

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
    border: 1px solid ${color.onSurface};
    color: ${color.onSurface};

    transition: background-color ${theme.durations.standard}ms,
      border ${theme.durations.standard}ms;

    &:disabled {
      &,
      &:hover,
      &:focus {
        color: ${transparentize(0.4, color.onSurface)};
        background-color: transparent;
      }
    }
  `,
  outlinedClickable: css`
    cursor: pointer;
    &:focus {
      background-color: ${transparentize(0.92, color.asBackground)};
    }
    &:hover {
      background-color: ${transparentize(0.9, color.asBackground)};
    }
    &:active {
      background-color: ${transparentize(0.8, color.asBackground)};
    }
  `,
  filled: css`
    background-color: ${color.asBackground};
    color: ${color.bgContrast};
    border: 2px solid transparent;
    transition: background-color ${theme.durations.standard}ms,
      border ${theme.durations.standard}ms;

    &:disabled {
      background-color: ${transparentize(0.5, color.asBackground)};
      border: 2px solid transparent;
      color: ${transparentize(0.2, color.bgContrast)};
    }
  `,
  filledClickable: css`
    cursor: pointer;
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

  const theme = useTheme();
  const colorContext = useColorContext();

  let color = props.color ?? colorContext?.on ?? theme.colors.accent;
  let on = props.on ?? colorContext?.on ?? theme.colors.surface;

  if (variant === 'filled') {
    on = color;
  }

  return (
    <ColorProvider on={on} color={color}>
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
    </ColorProvider>
  );
});

export default Chip;
