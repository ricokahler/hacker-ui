import React, { forwardRef, useState, useMemo } from 'react';
import shortId from 'shortid';
import createStyles from './createStyles';
import { PropsFromStyles, ReactComponent } from './types';
import FormControlContext from './FormControlContext';
import ColorProvider from './ColorProvider';
import useColorContext from './useColorContext';
import useTheme from './useTheme';

const useStyles = createStyles(({ css }) => ({
  root: css`
    display: flex;
    flex-direction: column;
  `,
}));

type DivProps = JSX.IntrinsicElements['div'];
interface Props extends PropsFromStyles<typeof useStyles>, DivProps {
  component?: ReactComponent;
  hasError?: boolean;
  disabled?: boolean;
}

const FormControl = forwardRef(
  (props: Props, ref: React.Ref<HTMLDivElement>) => {
    const {
      Root,
      styles,
      component,
      hasError = false,
      disabled = false,
      ...restOfProps
    } = useStyles(props, props.component || 'div');

    const colorContext = useColorContext();
    const theme = useTheme();

    const color = props.color ?? colorContext?.on ?? theme.colors.accent;
    const on = props.on ?? colorContext?.on ?? theme.colors.surface;

    const id = useMemo(() => `hui-${shortId()}`, []);
    const [focused, setFocused] = useState(false);

    const formControlContextValue = useMemo(
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
      <ColorProvider color={color} on={on}>
        <FormControlContext.Provider value={formControlContextValue}>
          <Root ref={ref} {...restOfProps} />
        </FormControlContext.Provider>
      </ColorProvider>
    );
  },
);

export default FormControl;
