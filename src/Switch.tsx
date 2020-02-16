import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { transparentize } from 'polished';
import createDynamicColorPalette from './createDynamicColorPalette';
import FormControlContext from './FormControlContext';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, color, theme, givenSurface }) => {
  const bland = createDynamicColorPalette(theme.colors.bland, givenSurface);
  const danger = createDynamicColorPalette(theme.colors.danger, givenSurface);

  const width = theme.space(3.5);
  const height = theme.space(2);

  const widthSmall = theme.space(2.75);
  const heightSmall = theme.space(1.5);

  const widthLarge = theme.space(4);
  const heightLarge = theme.space(2.5);

  return {
    root: css`
      position: relative;
      margin: ${theme.space(0.5)} 0;
      background-color: ${givenSurface};
      border-radius: 99999px;
    `,
    hasError: css`
      color: ${danger.asBackground};
      & .facade {
        border: 2px solid ${danger.asBackground};
      }
      & .switch:focus ~ .facade {
        border: 2px solid ${danger.asBackground};
        background-color: ${transparentize(0.93, danger.asBackground)};
      }
      & .switch:not([disabled]):hover ~ .facade {
        border: 2px solid ${transparentize(0.3, danger.asBackground)};
        background-color: ${transparentize(0.93, danger.asBackground)};
      }
      & .switch:active ~ .facade {
        background-color: ${transparentize(0.9, danger.asBackground)};
      }

      & .switch:checked ~ .facade {
        background-color: ${transparentize(0.93, danger.asBackground)};
      }

      & .switch:checked ~ .facade .dot {
        fill: ${danger.asBackground};
      }
    `,
    switch: css`
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
        cx: 125;
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
    switchStandard: css`
      width: ${width};
      height: ${height};
    `,
    switchSmall: css`
      width: ${widthSmall};
      height: ${heightSmall};
    `,
    switchLarge: css`
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
      transition: cx ${theme.durations.standard}ms,
        fill ${theme.durations.standard}ms;
    `,
    dotSmall: css`
      r: 30;
    `,
    dotStandard: css`
      r: 35;
    `,
    dotLarge: css`
      r: 40;
    `,
  };
});

type InputProps = Omit<JSX.IntrinsicElements['input'], 'size' | 'type'>;
interface Props extends PropsFromStyles<typeof useStyles>, InputProps {
  hasError?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  size?: 'small' | 'standard' | 'large';
}

const Switch = forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    Root,
    styles,
    id: incomingId,
    hasError: incomingHasError,
    disabled: incomingDisabled,
    onFocus,
    onBlur,
    inputRef,
    size = 'standard',
    ...restOfProps
  } = useStyles(props);
  const formControlContext = useContext(FormControlContext);

  const id = incomingId ?? formControlContext?.id;
  const hasError =
    Boolean(formControlContext?.hasError) || Boolean(incomingHasError);
  const disabled =
    Boolean(formControlContext?.disabled) || Boolean(incomingDisabled);

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
        [styles.hasError]: hasError,
      })}
    >
      <input
        type="checkbox"
        id={id}
        ref={inputRef}
        className={classNames('switch', styles.switch, {
          [styles.switchSmall]: size === 'small',
          [styles.switchStandard]: size === 'standard',
          [styles.switchLarge]: size === 'large',
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
        <svg className={styles.icon} viewBox="0 0 175 100">
          <circle
            className={classNames('dot', styles.dot, {
              [styles.dotSmall]: size === 'small',
              [styles.dotStandard]: size === 'standard',
              [styles.dotLarge]: size === 'large',
            })}
            cx="50"
            cy="50"
          />
        </svg>
      </div>
    </Root>
  );
});

export default Switch;
