import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { transparentize, readableColor } from 'polished';
import createStyles from './createStyles';
import FormControlContext from './FormControlContext';
import { PropsFromStyles, ReactComponent } from './types';
import createDynamicColorPalette from './createDynamicColorPalette';
import AngleDownIcon from './AngleDownIcon';

const useStyles = createStyles(({ css, theme, color, givenSurface }) => {
  const bland = createDynamicColorPalette(theme.colors.bland, givenSurface);
  const danger = createDynamicColorPalette(theme.colors.danger, givenSurface);

  return {
    root: css`
      position: relative;
      margin: ${theme.space(0.5)} 0;
    `,
    select: css`
      ${theme.fonts.body1};
      width: 100%;
      height: 100%;
      appearance: none;
      outline: none;
      border: none;
      background: none;
      padding: ${theme.space(0.75)} ${theme.space(0.5)};
      border-radius: 0;
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
      }
    `,
    selectFilled: css`
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
    selectFilledHasError: css`
      background-color: ${transparentize(0.9, danger.asBackground)};
      color: ${readableColor(givenSurface)};
      &:focus {
        background-color: ${transparentize(0.85, danger.asBackground)};
      }
      &:not([disabled]):hover {
        background-color: ${transparentize(0.87, danger.asBackground)};
      }
    `,
    selectOutlined: css`
      background-color: ${givenSurface};
      transition: border ${theme.durations.standard}ms,
        background-color ${theme.durations.standard}ms,
        color ${theme.durations.standard}ms;
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
    selectedOutlinedHasError: css`
      border: 2px solid ${danger.asBackground};
      &:focus {
        border: 2px solid ${danger.asBackground};
        background-color: ${transparentize(0.93, danger.asBackground)};
      }
      &:not([disabled]):hover {
        border: 2px solid ${transparentize(0.3, danger.asBackground)};
      }
    `,
    icon: css`
      pointer-events: none;
      width: ${theme.space(1)};
      height: ${theme.space(1)};
      position: absolute;
      right: ${theme.space(0.75)};
      top: 50%;
      transform: translateY(-50%);
    `,
  };
});

type SelectProps = JSX.IntrinsicElements['select'];
interface Props extends PropsFromStyles<typeof useStyles>, SelectProps {
  component?: ReactComponent;
  selectRef?: React.Ref<HTMLSelectElement>;
  hasError?: boolean;
  variant?: 'outlined' | 'filled';
  icon?: ReactComponent;
}

const Select = forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const formControlContext = useContext(FormControlContext);
  const {
    Root,
    styles,
    component,
    selectRef,
    disabled: incomingDisabled,
    hasError: incomingHasError,
    onFocus,
    onBlur,
    variant = 'outlined',
    ...restOfProps
  } = useStyles(props, props.component ?? 'div');

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
    <Root ref={ref}>
      <select
        ref={selectRef}
        className={classNames(styles.select, {
          [styles.selectFilled]: variant === 'filled',
          [styles.selectFilledHasError]: variant === 'filled' && hasError,
          [styles.selectOutlined]: variant === 'outlined',
          [styles.selectedOutlinedHasError]: variant === 'outlined' && hasError,
        })}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restOfProps}
      />
      <AngleDownIcon className={styles.icon} />
    </Root>
  );
});

export default Select;
