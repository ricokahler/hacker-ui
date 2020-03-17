import React, { forwardRef, useState, useMemo } from 'react';
import nanoId from 'nanoid';
import {
  createStyles,
  PropsFromStyles,
  ColorContextProvider,
  useColorContext,
  useTheme,
} from 'react-style-system';
import { ReactComponent } from './types';
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

    const color = props.color ?? colorContext?.color ?? theme.colors.accent;
    const surface =
      props.surface ?? colorContext?.surface ?? theme.colors.surface;

    const id = useMemo(() => `hui-${nanoId()}`, []);
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
      <ColorContextProvider color={color} surface={surface}>
        <FormControlContext.Provider value={formControlContextValue}>
          <Root ref={ref} {...restOfProps} />
        </FormControlContext.Provider>
      </ColorContextProvider>
    );
  },
);

FormControl.displayName = 'FormControl';

export default FormControl;
