import React, { useContext, forwardRef } from 'react';
import classNames from 'classnames';
import {
  createStyles,
  readableColor,
  transparentize,
} from 'react-style-system';
import { createReadablePalette, PropsFromStyles } from 'react-style-system';
import FormControlContext from './FormControlContext';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color, surface }) => {
  const bland = createReadablePalette(theme.bland, surface);

  return {
    root: css`
      ${theme.body1};
      color: ${readableColor(theme.surface)};
      transition: color ${theme.duration.standard};
      cursor: pointer;
    `,
    focused: css`
      color: ${color.readable};
    `,
    hasError: css`
      color: ${theme.danger};
    `,
    disabled: css`
      color: ${transparentize(bland.readable, 0.3)};
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

Label.displayName = 'Label';

export default Label;
