import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { transparentize, readableColor } from 'polished';
import {
  createStyles,
  createReadablePalette,
  PropsFromStyles,
} from 'react-style-system';
import FormControlContext from './FormControlContext';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color, surface }) => {
  const bland = createReadablePalette(theme.colors.bland, surface);
  const danger = createReadablePalette(theme.colors.danger, surface);

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
      background-color: ${transparentize(0.8, bland.decorative)};
      color: ${readableColor(surface)};
      transition: background-color ${theme.durations.standard}ms;

      &:focus {
        background-color: ${transparentize(0.92, color.decorative)};
        color: ${readableColor(surface)};
      }
      &:hover {
        background-color: ${transparentize(0.9, color.decorative)};
        color: ${readableColor(surface)};
      }
      &:disabled {
        background-color: ${transparentize(0.9, bland.decorative)};
      }
    `,
    filledHasError: css`
      background-color: ${transparentize(0.9, danger.decorative)};
      color: ${readableColor(surface)};
      &:focus {
        background-color: ${transparentize(0.85, danger.decorative)};
      }
      &:not([disabled]):hover {
        background-color: ${transparentize(0.87, danger.decorative)};
      }
    `,
    outlined: css`
      background-color: ${surface};
      transition: border ${theme.durations.standard}ms,
        background-color ${theme.durations.standard}ms;
      border: 2px solid ${bland.decorative};

      &:focus {
        border: 2px solid ${color.decorative};
        background-color: ${transparentize(0.93, color.decorative)};
      }
      &:hover {
        border: 2px solid ${transparentize(0.3, color.decorative)};
      }
      &:disabled {
        border: 2px solid ${transparentize(0.7, bland.decorative)};
        background-color: ${transparentize(0.9, bland.decorative)};
      }
    `,
    outlinedHasError: css`
      border: 2px solid ${danger.decorative};
      &:focus {
        border: 2px solid ${danger.decorative};
        background-color: ${transparentize(0.93, danger.decorative)};
      }
      &:not([disabled]):hover {
        border: 2px solid ${transparentize(0.3, danger.decorative)};
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
