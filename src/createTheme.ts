import { Theme } from './types';
import defaultTheme from './defaultTheme';

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

/**
 * recursively merges a base object with an incoming object
 */
function recursiveMerge<T>(base: T, incoming: RecursivePartial<T>): T {
  const keys = Object.keys(base) as Array<keyof T>;

  const merged = keys.reduce((merged, key) => {
    const baseValue = base[key];
    const incomingValue = incoming[key];

    const mergedValue =
      Object.keys(baseValue).length > 0
        ? recursiveMerge(baseValue, incomingValue as T[keyof T])
        : ((incomingValue || baseValue) as T[keyof T]);
    merged[key] = mergedValue;

    return merged;
  }, {} as T);

  return merged;
}

function createTheme(partialTheme: RecursivePartial<Theme>): Theme {
  return recursiveMerge(defaultTheme, partialTheme);
}

export default createTheme;
