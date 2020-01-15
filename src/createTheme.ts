import { Theme } from './types';
import defaultTheme from './defaultTheme';

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

function isObject(maybe: any) {
  if (!maybe) return false;
  return typeof maybe === 'object';
}

/**
 * recursively merges a base object with an incoming object
 */
export function recursiveMerge<T>(
  base: T,
  incoming: RecursivePartial<T> = {},
): T {
  const keys = [...Object.keys(base), ...Object.keys(incoming)] as Array<
    keyof T
  >;

  const merged = keys.reduce((merged, key) => {
    const baseValue = base[key];
    const incomingValue = incoming[key];

    const mergedValue = isObject(baseValue)
      ? recursiveMerge(baseValue, incomingValue as T[keyof T])
      : ((incomingValue || baseValue) as T[keyof T]);
    merged[key] = mergedValue;

    return merged;
  }, {} as T);

  return merged;
}

function createTheme(partialTheme: RecursivePartial<Theme> = {}): Theme {
  return recursiveMerge(defaultTheme, partialTheme);
}

export default createTheme;
