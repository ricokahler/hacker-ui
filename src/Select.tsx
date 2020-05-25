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
import AngleDownIcon from './AngleDownIcon';

const useStyles = createStyles(({ css, theme, color, surface }) => {
  const mixWithSurface = (color: string, amount: number) =>
    mix(color, surface, amount);

  const bland = createReadablePalette(theme.bland, surface);
  const danger = createReadablePalette(theme.danger, surface);

  return {
    root: css`
      position: relative;
      margin: ${theme.space(0.5)} 0;
    `,
    select: css`
      ${theme.body1};
      width: 100%;
      height: 100%;
      appearance: none;
      outline: none;
      border: none;
      background: none;
      padding: ${theme.space(0.75)} ${theme.space(0.5)};
      border-radius: ${theme.borderRadius};
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
      }
    `,
    selectFilled: css`
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
    selectFilledHasError: css`
      background-color: ${mixWithSurface(danger.decorative, 0.9)};
      color: ${readableColor(surface)};
      &:focus {
        background-color: ${mixWithSurface(danger.decorative, 0.85)};
      }
      &:not([disabled]):hover {
        background-color: ${mixWithSurface(danger.decorative, 0.87)};
      }
    `,
    selectOutlined: css`
      background-color: ${surface};
      transition: border ${theme.duration.standard},
        background-color ${theme.duration.standard},
        color ${theme.duration.standard};
      border: 2px solid ${bland.decorative};
      color: ${readableColor(surface)};

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
    selectedOutlinedHasError: css`
      border: 2px solid ${danger.decorative};
      &:focus {
        border: 2px solid ${danger.decorative};
        background-color: ${mixWithSurface(danger.decorative, 0.93)};
      }
      &:not([disabled]):hover {
        border: 2px solid ${transparentize(danger.decorative, 0.3)};
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
    id: incomingId,
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

  const id = incomingId ?? formControlContext?.id;

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
        id={id}
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

Select.displayName = 'Select';

export default Select;
