import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import FormControlContext from './FormControlContext';
import createStyles from './createStyles';
import { PropsFromStyles, ReactComponent } from './types';

const useStyles = createStyles(({ css, color, theme }) => ({
  root: css`
    ${theme.fonts.caption}
    transition: color ${theme.durations.standard}ms;
  `,
  focused: css`
    color: ${color.onSurface};
  `,
  hasError: css`
    color: ${theme.colors.danger};
  `,
}));

type DivProps = JSX.IntrinsicElements['div'];
interface Props extends PropsFromStyles<typeof useStyles>, DivProps {
  component?: ReactComponent;
  focused?: boolean;
  hasError?: boolean;
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
      ...restOfProps
    } = useStyles(props, props.component ?? 'div');

    const focused = incomingFocused ?? formControlContext?.focused ?? false;
    const hasError = incomingHasError ?? formControlContext?.hasError ?? false;

    return (
      <Root
        className={classNames({
          [styles.focused]: focused,
          [styles.hasError]: hasError,
        })}
        ref={ref}
        {...restOfProps}
      />
    );
  },
);

export default HelperText;
