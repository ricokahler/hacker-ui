import defaultTheme, { DefaultTheme } from './defaultTheme';

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
export function recursiveMerge<
  T,
  U extends RecursivePartial<T> & { [key: string]: any }
>(base: T, incoming: U): T & U {
  const keys = [...Object.keys(base), ...Object.keys(incoming)] as Array<
    keyof T | keyof U
  >;

  const merged = keys.reduce((merged, key) => {
    const baseValue = (base as any)[key];
    const incomingValue = incoming[key];

    if (isObject(baseValue)) {
      merged[key] = recursiveMerge(baseValue, incomingValue);
      return merged;
    }

    const baseDescriptor = Object.getOwnPropertyDescriptor(base, key);
    const incomingDescriptor = Object.getOwnPropertyDescriptor(incoming, key);

    const baseGetter = baseDescriptor?.get?.bind(merged);
    const incomingGetter = incomingDescriptor?.get?.bind(merged);

    const incomingIsValue =
      (incomingDescriptor && 'value' in incomingDescriptor) || false;

    if (incomingIsValue) {
      merged[key] = incomingValue;
      return merged;
    }

    if (incomingGetter) {
      Object.defineProperty(merged, key, {
        get: incomingGetter,
        enumerable: true,
        configurable: true,
      });
      return merged;
    }

    if (baseGetter) {
      Object.defineProperty(merged, key, {
        get: baseGetter,
        enumerable: true,
        configurable: true,
      });
      return merged;
    }

    merged[key] = baseValue;
    return merged;
  }, {} as T & U);

  return merged;
}

function createTheme<
  T extends RecursivePartial<DefaultTheme> & { [key: string]: any }
>(partialTheme?: T): DefaultTheme & T {
  return recursiveMerge(defaultTheme, partialTheme || {}) as DefaultTheme & T;
}

export default createTheme;
