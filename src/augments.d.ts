import {
  StyleFnArgs,
  ReactComponent,
  StyleProps,
  GetComponentProps,
} from 'react-style-system';
import { DefaultTheme } from './types';

declare module 'react-style-system' {
  export function createStyles<Styles, ComponentType extends ReactComponent>(
    stylesFn: (args: StyleFnArgs<DefaultTheme>) => Styles,
  ): <Props extends StyleProps<Styles>>(
    props: Props,
    component?: ComponentType,
  ) => {
    Root: React.ComponentType<GetComponentProps<ComponentType>>;
    styles: { [P in keyof Styles]: string } & {
      cssVariableObject: { [key: string]: string };
    };
  } & Omit<Props, keyof StyleProps<any>>;

  export function useTheme(): DefaultTheme;
}
