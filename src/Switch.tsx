import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { transparentize } from 'polished';
import createDynamicColorPalette from './createDynamicColorPalette';
import FormControlContext from './FormControlContext';
import createStyles from './createStyles';
import { PropsFromStyles, ReactComponent } from './types';
import CheckIcon from './CheckIcon';

const useStyles = createStyles(({ css, color, theme, givenSurface }) => {
  const bland = createDynamicColorPalette(theme.colors.bland, givenSurface);
  const danger = createDynamicColorPalette(theme.colors.danger, givenSurface);

  const width = theme.space(4);
  const height = theme.space(2);

  const widthSmall = theme.space(1.5);
  const heightSmall = theme.space(1.5);

  const widthLarge = theme.space(2.5);
  const heightLarge = theme.space(2.5);

  return {
    root: css`
      position: relative;
      margin: ${theme.space(0.5)} 0;
      background-color: ${givenSurface};
    `,
    focused: css`
      color: ${color.asBackground};
    `,
    hasError: css`
      color: ${danger.asBackground};
      & .facade {
        border: 2px solid ${danger.asBackground};
      }
      & .checkbox:focus ~ .facade {
        border: 2px solid ${danger.asBackground};
        background-color: ${transparentize(0.93, danger.asBackground)};
      }
      & .checkbox:not([disabled]):hover ~ .facade {
        border: 2px solid ${transparentize(0.3, danger.asBackground)};
        background-color: ${transparentize(0.93, danger.asBackground)};
      }
      & .checkbox:active ~ .facade {
        background-color: ${transparentize(0.9, danger.asBackground)};
      }

      & .checkbox:checked ~ .facade {
        background-color: ${transparentize(0.93, danger.asBackground)};
      }

      & .checkbox:checked ~ .facade .dot {
        fill: ${danger.asBackground};
      }
    `,
    checkbox: css`
      cursor: pointer;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;

      &:focus ~ .facade {
        border: 2px solid ${color.asBackground};
        background-color: ${transparentize(0.93, color.asBackground)};
      }
      &:hover ~ .facade {
        border: 2px solid ${transparentize(0.3, color.asBackground)};
        background-color: ${transparentize(0.93, color.asBackground)};
      }
      &:active ~ .facade {
        background-color: ${transparentize(0.9, color.asBackground)};
      }

      &:disabled ~ .facade {
        cursor: not-allowed;
        border: 2px solid ${transparentize(0.7, bland.asBackground)};
        background-color: ${transparentize(0.9, bland.asBackground)};
      }

      &:disabled {
        cursor: not-allowed;
      }

      &:checked ~ .facade .dot {
        cx: 150;
        fill: ${color.asBackground};
      }

      &:disabled ~ .facade .dot {
        fill: ${bland.asBackground};
      }

      &:checked ~ .facade {
        /* border: 2px solid ${bland.asBackground}; */
        background-color: ${transparentize(0.9, color.asBackground)};
      }
    `,
    checkboxStandard: css`
      width: ${width};
      height: ${height};
    `,
    checkboxSmall: css`
      width: ${widthSmall};
      height: ${heightSmall};
    `,
    checkboxLarge: css`
      width: ${widthLarge};
      height: ${heightLarge};
    `,
    facade: css`
      width: ${width};
      height: ${height};
      border-radius: 99999px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 auto;
      background-color: white;
      transition: border ${theme.durations.standard}ms,
        background-color ${theme.durations.standard}ms;
      border: 2px solid ${bland.asBackground};
      background-color: ${givenSurface};
    `,
    facadeSmall: css`
      width: ${widthSmall};
      height: ${heightSmall};
    `,
    facadeStandard: css`
      width: ${width};
      height: ${height};
    `,
    facadeLarge: css`
      width: ${widthLarge};
      height: ${heightLarge};
    `,
    icon: css`
      width: ${width};
      height: ${height};
      fill: currentColor;
      pointer-events: none;
    `,
    dot: css`
      transition: cx ${theme.durations.standard}ms;
    `,
  };
});

type InputProps = Omit<JSX.IntrinsicElements['input'], 'size' | 'type'>;
interface Props extends PropsFromStyles<typeof useStyles>, InputProps {
  focused?: boolean;
  hasError?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  icon?: ReactComponent;
  size?: 'small' | 'standard' | 'large';
}

const Checkbox = forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    Root,
    styles,
    id: incomingId,
    focused: incomingFocused,
    hasError: incomingHasError,
    disabled: _incomingDisabled,
    onFocus,
    onBlur,
    inputRef,
    icon: Icon = CheckIcon,
    size = 'standard',
    ...restOfProps
  } = useStyles(props);
  const formControlContext = useContext(FormControlContext);

  const id = incomingId ?? formControlContext?.id;
  const focused = incomingFocused ?? formControlContext?.focused ?? false;
  const hasError = incomingHasError ?? formControlContext?.hasError ?? false;
  const incomingDisabled = _incomingDisabled ?? false;
  const disabledFromContext = formControlContext?.disabled ?? false;
  const disabled = incomingDisabled || disabledFromContext;

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
      formControlContext?.setFocused(false);
    }
  };

  return (
    <Root
      ref={ref}
      className={classNames({
        [styles.focused]: focused,
        [styles.hasError]: hasError,
      })}
    >
      <input
        type="checkbox"
        id={id}
        ref={inputRef}
        className={classNames('checkbox', styles.checkbox, {
          [styles.checkboxSmall]: size === 'small',
          [styles.checkboxStandard]: size === 'standard',
          [styles.checkboxLarge]: size === 'large',
        })}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        {...restOfProps}
      />
      <div
        aria-hidden="true"
        className={classNames('facade', styles.facade, {
          [styles.facadeSmall]: size === 'small',
          [styles.facadeStandard]: size === 'standard',
          [styles.facadeLarge]: size === 'large',
        })}
      >
        <svg className={styles.icon} viewBox="0 0 200 100">
          <circle
            className={classNames('dot', styles.dot)}
            cx="50"
            cy="50"
            r="40"
          />
        </svg>
      </div>
    </Root>
  );
});

export default Checkbox;
