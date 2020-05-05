import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { transparentize } from 'polished';
import {
  createStyles,
  PropsFromStyles,
  createReadablePalette,
} from 'react-style-system';
import FormControlContext from './FormControlContext';
import RadioGroupContext from './RadioGroupContext';
import { ReactComponent } from './types';
import CircleIcon from './CircleIcon';

const useStyles = createStyles(({ css, color, theme, surface }) => {
  const bland = createReadablePalette(theme.colors.bland, surface);
  const danger = createReadablePalette(theme.colors.danger, surface);

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
    `,
    hasError: css`
      color: ${danger.decorative};
      & .facade {
        border: 2px solid ${danger.decorative};
      }
      & .radio:focus ~ .facade {
        border: 2px solid ${danger.decorative};
        background-color: ${transparentize(0.93, danger.decorative)};
      }
      & .radio:not([disabled]):hover ~ .facade {
        border: 2px solid ${transparentize(0.3, danger.decorative)};
        background-color: ${transparentize(0.93, danger.decorative)};
      }
      & .radio:active ~ .facade {
        background-color: ${transparentize(0.9, danger.decorative)};
      }
    `,
    radio: css`
      cursor: pointer;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;

      &:focus ~ .facade {
        border: 2px solid ${color.decorative};
        background-color: ${transparentize(0.93, color.decorative)};
      }
      &:hover ~ .facade {
        border: 2px solid ${transparentize(0.3, color.decorative)};
        background-color: ${transparentize(0.93, color.decorative)};
      }
      &:active ~ .facade {
        background-color: ${transparentize(0.9, color.decorative)};
      }

      &:disabled ~ .facade {
        cursor: not-allowed;
        border: 2px solid ${transparentize(0.7, bland.decorative)};
        background-color: ${transparentize(0.9, bland.decorative)};
      }

      &:disabled {
        cursor: not-allowed;
      }

      &:checked ~ .facade .icon {
        opacity: 1;
      }
    `,
    radioStandard: css`
      width: ${width};
      height: ${height};
    `,
    radioSmall: css`
      width: ${widthSmall};
      height: ${heightSmall};
    `,
    radioLarge: css`
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
      transition: border ${theme.durations.standard},
        background-color ${theme.durations.standard};
      border: 2px solid ${bland.decorative};
      background-color: ${surface};
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

const Radio = forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    Root,
    styles,
    id: incomingId,
    hasError: incomingHasError,
    disabled: incomingDisabled,
    checked: incomingChecked,
    name: incomingName,
    value,
    onFocus,
    onBlur,
    onChange,
    inputRef,
    icon: Icon = CircleIcon,
    size = 'standard',
    ...restOfProps
  } = useStyles(props);
  const formControlContext = useContext(FormControlContext);
  const radioGroupContext = useContext(RadioGroupContext);

  const id = incomingId ?? formControlContext?.id;
  const hasError =
    Boolean(formControlContext?.hasError) || Boolean(incomingHasError);
  const disabled =
    Boolean(formControlContext?.disabled) || Boolean(incomingDisabled);

  const checkedFromContext = radioGroupContext
    ? radioGroupContext.value === value
    : undefined;
  const checked = incomingChecked ?? checkedFromContext;
  const name = incomingName ?? radioGroupContext?.name;

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
  const handleChange = (e: React.ChangeEvent<any>) => {
    if (onChange) {
      onChange(e);
    }

    if (radioGroupContext) {
      radioGroupContext.handleChange(e);
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
        type="radio"
        id={id}
        ref={inputRef}
        value={value}
        name={name}
        checked={checked}
        className={classNames('radio', styles.radio, {
          [styles.radioSmall]: size === 'small',
          [styles.radioStandard]: size === 'standard',
          [styles.radioLarge]: size === 'large',
        })}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
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

Radio.displayName = 'Radio';

export default Radio;
