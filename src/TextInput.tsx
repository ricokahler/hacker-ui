import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { transparentize, readableColor } from 'polished';
import createDynamicColorPalette from './createDynamicColorPalette';
import createStyles from './createStyles';
import FormControlContext from './FormControlContext';
import { PropsFromStyles, ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color, givenSurface }) => {
  const bland = createDynamicColorPalette(theme.colors.bland, givenSurface);
  const danger = createDynamicColorPalette(theme.colors.danger, givenSurface);

  return {
    root: css`
      ${theme.fonts.body1};
      padding: ${theme.space(0.75)} ${theme.space(0.5)};
      border: none;
      outline: none;
      appearance: none;
      background: none;
      margin: ${theme.space(0.5)} 0;

      &:disabled {
        cursor: not-allowed;
      }
    `,
    filled: css`
      background-color: ${transparentize(0.8, bland.asBackground)};
      color: ${readableColor(givenSurface)};
      transition: background-color ${theme.durations.standard}ms;

      &:focus {
        background-color: ${transparentize(0.92, color.asBackground)};
        color: ${readableColor(givenSurface)};
      }
      &:hover {
        background-color: ${transparentize(0.9, color.asBackground)};
        color: ${readableColor(givenSurface)};
      }
      &:disabled {
        background-color: ${transparentize(0.9, bland.asBackground)};
      }
    `,
    filledHasError: css`
      background-color: ${transparentize(0.9, danger.asBackground)};
      color: ${readableColor(givenSurface)};
      &:focus {
        background-color: ${transparentize(0.85, danger.asBackground)};
      }
      &:not([disabled]):hover {
        background-color: ${transparentize(0.87, danger.asBackground)};
      }
    `,
    outlined: css`
      background-color: ${givenSurface};
      transition: border ${theme.durations.standard}ms,
        background-color ${theme.durations.standard}ms;
      border: 2px solid ${bland.asBackground};

      &:focus {
        border: 2px solid ${color.asBackground};
        background-color: ${transparentize(0.93, color.asBackground)};
      }
      &:hover {
        border: 2px solid ${transparentize(0.3, color.asBackground)};
      }
      &:disabled {
        border: 2px solid ${transparentize(0.7, bland.asBackground)};
        background-color: ${transparentize(0.9, bland.asBackground)};
      }
    `,
    outlinedHasError: css`
      border: 2px solid ${danger.asBackground};
      &:focus {
        border: 2px solid ${danger.asBackground};
        background-color: ${transparentize(0.93, danger.asBackground)};
      }
      &:not([disabled]):hover {
        border: 2px solid ${transparentize(0.3, danger.asBackground)};
      }
    `,
  };
});

type InputProps = JSX.IntrinsicElements['input'];
interface Props extends PropsFromStyles<typeof useStyles>, InputProps {
  hasError?: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'outlined';
  component?: ReactComponent;
}

const TextInput = forwardRef(
  (props: Props, ref: React.Ref<HTMLInputElement>) => {
    const {
      Root,
      styles,
      variant = 'outlined',
      hasError: incomingHasError,
      disabled: incomingDisabled,
      onFocus,
      onBlur,
      type = 'text',
      ...restOfProps
    } = useStyles(props, props.component ?? 'input');

    const formControlContext = useContext(FormControlContext);

    const id = formControlContext?.id;
    const disabled =
      Boolean(formControlContext?.disabled) || Boolean(incomingDisabled);
    const hasError =
      Boolean(formControlContext?.hasError) || Boolean(incomingHasError);

    const handleFocus = (e: React.FocusEvent<any>) => {
      if (onFocus) {
        onFocus(e);
      }

      if (formControlContext) {
        formControlContext.setFocused(true);
      }
    };
    const handleBlur = (e: React.FocusEvent<any>) => {
      if (onBlur) {
        onBlur(e);
      }

      if (formControlContext) {
        formControlContext.setFocused(false);
      }
    };

    return (
      <Root
        ref={ref}
        id={id}
        type={type}
        disabled={disabled}
        className={classNames({
          [styles.outlined]: variant === 'outlined',
          [styles.outlinedHasError]: variant === 'outlined' && hasError,
          [styles.filled]: variant === 'filled',
          [styles.filledHasError]: variant === 'filled' && hasError,
        })}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restOfProps}
      />
    );
  },
);

export default TextInput;
