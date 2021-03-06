import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import {
  createStyles,
  createReadablePalette,
  PropsFromStyles,
  transparentize,
  readableColor,
  mix,
} from 'react-style-system';
import FormControlContext from './FormControlContext';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color, surface }) => {
  const mixWithSurface = (color: string, amount: number) =>
    mix(color, surface, amount);

  const bland = createReadablePalette(theme.bland, surface);
  const danger = createReadablePalette(theme.danger, surface);

  return {
    root: css`
      ${theme.body1};
      padding: ${theme.space(0.75)} ${theme.space(0.5)};
      border: none;
      outline: none;
      appearance: none;
      background: none;
      margin: ${theme.space(0.5)} 0;
      border-radius: ${theme.borderRadius};
      color: ${readableColor(theme.surface)};

      &::placeholder {
        color: ${mixWithSurface(readableColor(theme.surface), 0.25)};
      }

      &:disabled {
        cursor: not-allowed;
      }
    `,
    filled: css`
      background-color: ${mixWithSurface(bland.decorative, 0.8)};
      color: ${readableColor(surface)};
      transition: background-color ${theme.duration.standard};

      &:focus {
        background-color: ${mixWithSurface(color.decorative, 0.92)};
        color: ${readableColor(surface)};
      }
      &:hover {
        background-color: ${mixWithSurface(color.decorative, 0.9)};
        color: ${readableColor(surface)};
      }
      &:disabled {
        background-color: ${mixWithSurface(bland.decorative, 0.9)};
      }
    `,
    filledHasError: css`
      background-color: ${mixWithSurface(danger.decorative, 0.9)};
      color: ${readableColor(surface)};
      &:focus {
        background-color: ${mixWithSurface(danger.decorative, 0.85)};
      }
      &:not([disabled]):hover {
        background-color: ${mixWithSurface(danger.decorative, 0.87)};
      }
    `,
    outlined: css`
      background-color: ${surface};
      transition: border ${theme.duration.standard},
        background-color ${theme.duration.standard};
      border: 2px solid ${bland.decorative};

      &:focus {
        border: 2px solid ${color.decorative};
        background-color: ${mixWithSurface(color.decorative, 0.93)};
      }
      &:hover {
        border: 2px solid ${transparentize(color.decorative, 0.3)};
      }
      &:disabled {
        border: 2px solid ${transparentize(bland.decorative, 0.7)};
        background-color: ${mixWithSurface(bland.decorative, 0.9)};
      }
    `,
    outlinedHasError: css`
      border: 2px solid ${danger.decorative};
      &:focus {
        border: 2px solid ${danger.decorative};
        background-color: ${mixWithSurface(danger.decorative, 0.93)};
      }
      &:not([disabled]):hover {
        border: 2px solid ${transparentize(danger.decorative, 0.3)};
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

TextInput.displayName = 'TextInput';

export default TextInput;
