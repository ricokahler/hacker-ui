import React, { useContext, forwardRef } from 'react';
import classNames from 'classnames';
import { readableColor, transparentize } from 'polished';
import createStyles from './createStyles';
import createDynamicColorPalette from './createDynamicColorPalette';
import FormControlContext from './FormControlContext';
import { PropsFromStyles, ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color, givenSurface }) => {
  const bland = createDynamicColorPalette(theme.colors.bland, givenSurface);

  return {
    root: css`
      ${theme.fonts.body1};
      color: ${readableColor(theme.colors.surface)};
      transition: color ${theme.durations.standard}ms;
      cursor: pointer;
    `,
    focused: css`
      color: ${color.onSurface};
    `,
    hasError: css`
      color: ${theme.colors.danger};
    `,
    disabled: css`
      color: ${transparentize(0.3, bland.onSurface)};
      cursor: not-allowed;
    `,
  };
});

type LabelProps = JSX.IntrinsicElements['label'];
interface Props extends PropsFromStyles<typeof useStyles>, LabelProps {
  component?: ReactComponent;
  focused?: boolean;
  hasError?: boolean;
  disabled?: boolean;
}

const Label = forwardRef((props: Props, ref: React.Ref<HTMLLabelElement>) => {
  const {
    Root,
    styles,
    component,
    id: incomingId,
    focused: incomingFocused,
    hasError: incomingHasError,
    disabled: incomingDisabled,
    ...restOfProps
  } = useStyles(props, props.component || 'label');

  const formControlContext = useContext(FormControlContext);

  const id = incomingId ?? formControlContext?.id;
  const focused = incomingFocused ?? formControlContext?.focused ?? false;
  const hasError = incomingHasError ?? formControlContext?.hasError ?? false;
  const disabled = incomingDisabled ?? formControlContext?.disabled ?? false;

  return (
    <Root
      className={classNames({
        [styles.focused]: focused,
        [styles.hasError]: hasError,
        [styles.disabled]: disabled,
      })}
      ref={ref}
      htmlFor={id}
      {...restOfProps}
    />
  );
});

export default Label;
