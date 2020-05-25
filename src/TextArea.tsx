import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import {
  createStyles,
  createReadablePalette,
  PropsFromStyles,
  transparentize,
  readableColor,
} from 'react-style-system';
import FormControlContext from './FormControlContext';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color, surface }) => {
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

      &:disabled {
        cursor: not-allowed;
      }
    `,
    filled: css`
      background-color: ${transparentize(bland.decorative, 0.8)};
      color: ${readableColor(surface)};
      transition: background-color ${theme.duration.standard};

      &:focus {
        background-color: ${transparentize(color.decorative, 0.92)};
        color: ${readableColor(surface)};
      }
      &:hover {
        background-color: ${transparentize(color.decorative, 0.9)};
        color: ${readableColor(surface)};
      }
      &:disabled {
        background-color: ${transparentize(bland.decorative, 0.9)};
      }
    `,
    filledHasError: css`
      background-color: ${transparentize(danger.decorative, 0.9)};
      color: ${readableColor(surface)};
      &:focus {
        background-color: ${transparentize(danger.decorative, 0.85)};
      }
      &:not([disabled]):hover {
        background-color: ${transparentize(danger.decorative, 0.87)};
      }
    `,
    outlined: css`
      background-color: ${surface};
      transition: border ${theme.duration.standard},
        background-color ${theme.duration.standard};
      border: 2px solid ${bland.decorative};

      &:focus {
        border: 2px solid ${color.decorative};
        background-color: ${transparentize(color.decorative, 0.93)};
      }
      &:hover {
        border: 2px solid ${transparentize(color.decorative, 0.3)};
      }
      &:disabled {
        border: 2px solid ${transparentize(bland.decorative, 0.7)};
        background-color: ${transparentize(bland.decorative, 0.9)};
      }
    `,
    outlinedHasError: css`
      border: 2px solid ${danger.decorative};
      &:focus {
        border: 2px solid ${danger.decorative};
        background-color: ${transparentize(danger.decorative, 0.93)};
      }
      &:not([disabled]):hover {
        border: 2px solid ${transparentize(danger.decorative, 0.3)};
      }
    `,
  };
});

type TextAreaProps = JSX.IntrinsicElements['textarea'];
interface Props extends PropsFromStyles<typeof useStyles>, TextAreaProps {
  focused?: boolean;
  hasError?: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'outlined';
  component?: ReactComponent;
}

const TextArea = forwardRef(
  (props: Props, ref: React.Ref<HTMLTextAreaElement>) => {
    const {
      Root,
      styles,
      variant = 'outlined',
      focused: _focused,
      hasError: incomingHasError,
      disabled: incomingDisabled,
      onFocus,
      onBlur,
      ...restOfProps
    } = useStyles(props, props.component ?? 'textarea');

    const formControlContext = useContext(FormControlContext);

    const id = formControlContext?.id;
    const hasError = incomingHasError ?? formControlContext?.hasError ?? false;
    const disabledFromFormControl = formControlContext?.disabled ?? false;
    const disabled = incomingDisabled || disabledFromFormControl;

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

TextArea.displayName = 'TextArea';

export default TextArea;
