export const add = (set: { [key: string]: boolean }, keyToAdd: string) => ({
  ...set,
  [keyToAdd]: true,
});

export const remove = (set: { [key: string]: boolean }, keyToRemove: string) =>
  Object.keys(set)
    .filter(key => key !== keyToRemove)
    .reduce((set, key) => {
      set[key] = true;
      return set;
    }, {} as { [key: string]: boolean });

export const toggle = (set: { [key: string]: boolean }, keyToToggle: string) =>
  set[keyToToggle] ? remove(set, keyToToggle) : add(set, keyToToggle);
