import React, { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { DynamicColorPalette } from './types';
import useTheme from './useTheme';
import createDynamicColorPalette from './createDynamicColorPalette';

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

function hashStyleObj(styleObj: { [key: string]: string | undefined }) {
  return Object.keys(styleObj)
    .map(key => `${key}_${styleObj[key] || ''}`)
    .join('__|__');
}

// preserve the object reference
const empty = {};

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
      styles: incomingStyles = empty as Styles,
      ...restOfProps
    } = props;

    const incomingStyleHash = hashStyleObj(incomingStyles);

    const mergedStyles = useMemo(() => {
      const colors = createDynamicColorPalette(color, on);
      const thisStyles = stylesFn(colors);

      const thisStyleKeys = Object.keys(thisStyles) as Array<keyof Styles>;

      return thisStyleKeys.reduce((merged, key) => {
        const thisStyle = thisStyles[key];
        const incomingStyle = incomingStyles[key];

        merged[key] = classNames(
          thisStyle,
          incomingStyle,
        ) as Styles[keyof Styles];

        return merged;
      }, {} as Styles);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color, on, incomingStyleHash]);

    const Component = (component || 'div') as React.ComponentType<any>;

    const Root = useMemo(() => {
      return forwardRef((rootProps: InternalStyleProps<Styles>, ref: any) => {
        const { className: rootClassName, style: rootStyles } = rootProps;

        return (
          <Component
            {...rootProps}
            ref={ref}
            className={classNames(
              mergedStyles.root,
              rootClassName,
              incomingClassName,
            )}
            style={{
              ...rootStyles,
              ...incomingStyle,
            }}
          />
        );
      }) as React.ComponentType<GetComponentProps<ComponentType>>;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incomingClassName, incomingStyleHash, mergedStyles.root]);

    return {
      Root,
      styles: mergedStyles,
      ...restOfProps,
    };
  }

  return useStyles;
}

export default makeStyles;
