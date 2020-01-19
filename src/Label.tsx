import React, { useContext, forwardRef } from 'react';
import classNames from 'classnames';
import { readableColor } from 'polished';
import createStyles from './createStyles';
import FormControlContext from './FormControlContext';
import { PropsFromStyles, ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color }) => ({
  root: css`
    ${theme.fonts.body1}
    color: ${readableColor(theme.colors.surface)};
    transition: color ${theme.durations.standard}ms;
  `,
  focused: css`
    color: ${color.onSurface};
  `,
  hasError: css`
    color: ${theme.colors.danger};
  `,
}));

type LabelProps = JSX.IntrinsicElements['label'];
interface Props extends PropsFromStyles<typeof useStyles>, LabelProps {
  component?: ReactComponent;
  focused?: boolean;
  hasError?: boolean;
}

const Label = forwardRef((props: Props, ref: React.Ref<HTMLLabelElement>) => {
  const {
    Root,
    styles,
    component,
    id: incomingId,
    focused: incomingFocused,
    hasError: incomingHasError,
    ...restOfProps
  } = useStyles(props, props.component || 'label');

  const formContext = useContext(FormControlContext);

  const id = incomingId ?? formContext?.id;
  const focused = incomingFocused ?? formContext?.focused ?? false;
  const hasError = incomingHasError ?? formContext?.hasError ?? false;

  return (
    <Root
      className={classNames({
        [styles.focused]: focused,
        [styles.hasError]: hasError,
      })}
      ref={ref}
      id={id}
      {...restOfProps}
    />
  );
});

export default Label;
