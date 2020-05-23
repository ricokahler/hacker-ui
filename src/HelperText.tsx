import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { transparentize } from 'polished';
import {
  PropsFromStyles,
  createStyles,
  createReadablePalette,
} from 'react-style-system';
import FormControlContext from './FormControlContext';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, color, theme, surface }) => {
  const bland = createReadablePalette(theme.bland, surface);

  return {
    root: css`
      ${theme.caption};
      transition: color ${theme.duration.standard};
    `,
    focused: css`
      color: ${color.readable};
    `,
    hasError: css`
      color: ${theme.danger};
    `,
    disabled: css`
      color: ${transparentize(0.3, bland.readable)};
      cursor: not-allowed;
    `,
  };
});

type DivProps = JSX.IntrinsicElements['div'];
interface Props extends PropsFromStyles<typeof useStyles>, DivProps {
  component?: ReactComponent;
  focused?: boolean;
  hasError?: boolean;
  disabled?: boolean;
}

const HelperText = forwardRef(
  (props: Props, ref: React.Ref<HTMLDivElement>) => {
    const formControlContext = useContext(FormControlContext);
    const {
      Root,
      styles,
      component,
      focused: incomingFocused,
      hasError: incomingHasError,
      disabled: incomingDisabled,
      ...restOfProps
    } = useStyles(props, props.component ?? 'div');

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
        {...restOfProps}
      />
    );
  },
);

HelperText.displayName = 'HelperText';

export default HelperText;
