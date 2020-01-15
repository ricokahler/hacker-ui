import React, { forwardRef } from 'react';
import classNames from 'classnames';
import useTheme from './useTheme';

export interface StyleProps<UseStylesFn> {
  on?: string;
  color?: string;
  style?: React.CSSProperties;
  styles?: Partial<GetStyleObj<UseStylesFn>>;
  className?: string;
}

interface InternalStyleProps<StylesObj> {
  on?: string;
  color?: string;
  style?: React.CSSProperties;
  styles?: Partial<StylesObj>;
  className?: string;
}

type GetStyleObj<UseStylesFn> = UseStylesFn extends (props: {
  styles: Partial<infer U>;
}) => any
  ? U
  : never;

type GetComponentProps<
  ComponentType extends
    | React.ComponentType<any>
    | keyof JSX.IntrinsicElements
    | string
> = ComponentType extends React.ComponentType<infer U>
  ? U
  : ComponentType extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[ComponentType]
  : any;

interface DynamicColorPalette {
  asBackground: string;
  onSurface: string;
  bgContrast: string;
}

function createDynamicColorPalette(
  color: string,
  onColor: string,
): DynamicColorPalette {}

function makeStyles<Styles extends { [key: string]: string }>(
  stylesFn: (colors: DynamicColorPalette) => Styles,
) {
  function useStyles<
    Props extends InternalStyleProps<Styles>,
    ComponentType extends
      | React.ComponentType<any>
      | keyof JSX.IntrinsicElements
      | string = 'div'
  >(
    props: Props,
    component?: ComponentType,
  ): Omit<Props, 'on' | 'color' | 'style' | 'styles' | 'className'> & {
    Root: React.ComponentType<GetComponentProps<ComponentType>>;
    styles: Styles;
  } {
    const theme = useTheme();
    const {
      color = theme.colors.bland,
      on = theme.colors.surface,
      style: incomingStyle,
      className: incomingClassName,
      styles: incomingStyles,
      ...restOfProps
    } = props;
    const colors = createDynamicColorPalette(color, on);
    const styles = stylesFn(colors);

    const Component = (component || 'div') as React.ComponentType<any>;

    const Root = forwardRef((props: InternalStyleProps<Styles>, ref: any) => {
      const { className: rootClassName, style: rootStyles } = props;

      return (
        <Component
          {...props}
          ref={ref}
          className={classNames(styles.root, rootClassName, incomingClassName)}
          style={{
            ...rootStyles,
            ...incomingStyle,
          }}
        />
      );
    }) as React.ComponentType<GetComponentProps<ComponentType>>;

    return {
      Root,
      styles,
      ...restOfProps,
    };
  }

  return useStyles;
}

export default makeStyles;
