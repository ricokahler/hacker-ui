import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import {
  createStyles,
  createReadablePalette,
  PropsFromStyles,
  mix,
  transparentize,
} from 'react-style-system';
import FormControlContext from './FormControlContext';
import { ReactComponent } from './types';
import CheckIcon from './CheckIcon';

const useStyles = createStyles(({ css, color, theme, surface }) => {
  const mixWithSurface = (color: string, amount: number) =>
    mix(color, surface, amount);

  const bland = createReadablePalette(theme.bland, surface);
  const danger = createReadablePalette(theme.danger, surface);

  const width = theme.space(2);
  const height = theme.space(2);

  const widthSmall = theme.space(1.5);
  const heightSmall = theme.space(1.5);

  const widthLarge = theme.space(2.5);
  const heightLarge = theme.space(2.5);

  return {
    root: css`
      position: relative;
      margin: ${theme.space(0.5)} 0;
      background-color: ${surface};
    `,
    hasError: css`
      color: ${danger.decorative};
      & .facade {
        border: 2px solid ${danger.decorative};
      }
      & .checkbox:focus ~ .facade {
        border: 2px solid ${danger.decorative};
        background-color: ${mixWithSurface(danger.decorative, 0.93)};
      }
      & .checkbox:not([disabled]):hover ~ .facade {
        border: 2px solid ${transparentize(danger.decorative, 0.3)};
        background-color: ${mixWithSurface(danger.decorative, 0.93)};
      }
      & .checkbox:active ~ .facade {
        background-color: ${mixWithSurface(danger.decorative, 0.9)};
      }
    `,
    checkbox: css`
      cursor: pointer;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;

      &:focus ~ .facade {
        border: 2px solid ${color.decorative};
        background-color: ${mixWithSurface(color.decorative, 0.93)};
      }
      &:hover ~ .facade {
        border: 2px solid ${transparentize(color.decorative, 0.3)};
        background-color: ${mixWithSurface(color.decorative, 0.93)};
      }
      &:active ~ .facade {
        background-color: ${mixWithSurface(color.decorative, 0.9)};
      }

      &:disabled ~ .facade {
        cursor: not-allowed;
        border: 2px solid ${transparentize(bland.decorative, 0.7)};
        background-color: ${mixWithSurface(bland.decorative, 0.9)};
      }

      &:disabled {
        cursor: not-allowed;
      }

      &:checked ~ .facade .icon {
        opacity: 1;
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
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 auto;
      background-color: white;
      transition: border ${theme.duration.standard},
        background-color ${theme.duration.standard};
      border: 2px solid ${bland.decorative};
      background-color: ${surface};
      border-radius: ${theme.borderRadius};
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
      width: 1rem;
      height: 1rem;
      fill: currentColor;
      opacity: 0;
      pointer-events: none;
    `,
  };
});

type InputProps = Omit<JSX.IntrinsicElements['input'], 'size' | 'type'>;
interface Props extends PropsFromStyles<typeof useStyles>, InputProps {
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
    hasError: incomingHasError,
    disabled: incomingDisabled,
    onFocus,
    onBlur,
    inputRef,
    icon: Icon = CheckIcon,
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
        <Icon className={classNames('icon', styles.icon)} />
      </div>
    </Root>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
