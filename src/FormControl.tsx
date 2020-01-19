import React, { forwardRef, useState, useMemo } from 'react';
import shortId from 'shortid';
import createStyles from './createStyles';
import { PropsFromStyles, ReactComponent } from './types';
import FormControlContext from './FormControlContext';

const useStyles = createStyles(({ css }) => ({
  root: css`
    display: flex;
    flex-direction: column;
  `,
}));

type DivProps = JSX.IntrinsicElements['div'];
interface Props extends PropsFromStyles<typeof useStyles>, DivProps {
  component?: ReactComponent;
  focused?: boolean;
  hasError?: boolean;
  disabled?: boolean;
}

const FormControl = forwardRef(
  (props: Props, ref: React.Ref<HTMLDivElement>) => {
    const {
      Root,
      styles,
      component,
      focused: incomingFocused,
      hasError = false,
      disabled = false,
      ...restOfProps
    } = useStyles(props, props.component || 'div');

    const id = useMemo(() => `hui-${shortId()}`, []);
    const [focusedState, setFocused] = useState(false);

    const focused = incomingFocused ?? focusedState;

    const contextValue = useMemo(
      () => ({
        id,
        focused,
        setFocused,
        hasError,
        disabled,
      }),
      [disabled, focused, hasError, id],
    );

    return (
      <FormControlContext.Provider value={contextValue}>
        <Root ref={ref} {...restOfProps} />
      </FormControlContext.Provider>
    );
  },
);

export default FormControl;
