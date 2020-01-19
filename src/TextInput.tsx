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
    `,
    filled: css`
      background-color: ${transparentize(0.8, bland.asBackground)};
      color: ${readableColor(givenSurface)};
      transition: background-color ${theme.durations.standard}ms;
    `,
    filledFocused: css`
      background-color: ${transparentize(0.9, color.asBackground)};
      color: ${readableColor(givenSurface)};
    `,
    filledHasError: css`
      background-color: ${transparentize(0.9, danger.asBackground)};
      color: ${readableColor(givenSurface)};
    `,
    outline: css`
      background-color: ${givenSurface};
      transition: border ${theme.durations.standard}ms;
      border: 2px solid ${bland.asBackground};
    `,
    outlineFocused: css`
      border: 2px solid ${color.onSurface};
    `,
    outlineHasError: css`
      border: 2px solid ${danger.onSurface};
    `,
  };
});

type InputProps = JSX.IntrinsicElements['input'];
interface Props extends PropsFromStyles<typeof useStyles>, InputProps {
  focused?: boolean;
  hasError?: boolean;
  variant?: 'filled' | 'outline';
  component?: ReactComponent;
}

const TextInput = forwardRef(
  (props: Props, ref: React.Ref<HTMLInputElement>) => {
    const {
      Root,
      styles,
      variant = 'outline',
      focused: incomingFocused,
      hasError: incomingHasError,
      onFocus,
      onBlur,
      type = 'text',
      ...restOfProps
    } = useStyles(props, props.component ?? 'input');

    const formControlContext = useContext(FormControlContext);

    const id = formControlContext?.id;
    const focused = incomingFocused ?? formControlContext?.focused ?? false;
    const hasError = incomingHasError ?? formControlContext?.hasError ?? false;

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
        className={classNames({
          [styles.outline]: variant === 'outline',
          [styles.outlineFocused]: variant === 'outline' && focused,
          [styles.outlineHasError]: variant === 'outline' && hasError,
          [styles.filled]: variant === 'filled',
          [styles.filledFocused]: variant === 'filled' && focused,
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
