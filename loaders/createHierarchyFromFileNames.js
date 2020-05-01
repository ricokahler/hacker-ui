function convertToTitle(key) {
  const split = key.split('/');
  let last = split[split.length - 1];
  const title = last
    // remove extension
    .replace(/.mdx$/, '')
    // replace non-letters with a space
    .replace(/[^a-z]/gi, ' ')
    .split(' ')
    // remove empty spaces
    .filter(Boolean)
    // capitalize
    .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
    .join(' ');
  return title;
}

function createHierarchyFromFileNames(collection) {
  const lookup = {};

  for (let i = 0; i < collection.length; i += 1) {
    const item = collection[i];
    const split = item.path.split('/');
    function traverse(l, s) {
      const [first, ...rest] = s;
      if (rest.length > 0) {
        l[first] = l[first] || {};
        traverse(l[first], rest);
      } else {
        l[first] = i;
      }
    }
    traverse(lookup, split);
  }

  function removeCommonRoot(l) {
    if (typeof l === 'number') return {}; // should never happen

    const keys = Object.keys(l);
    const values = Object.values(l);
    if (values.every((v) => typeof v === 'number')) return l;
    if (keys.length !== 1) return l;

    const first = keys[0];
    return removeCommonRoot(l[first]);
  }

  const root = removeCommonRoot(lookup);

  function convertToArray(l) {
    return Object.entries(l)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, value]) => ({
        title: convertToTitle(key),
        value:
          typeof value === 'number'
            ? collection[value].value
            : convertToArray(value),
      }));
  }

  return convertToArray(root);
}

module.exports = createHierarchyFromFileNames;
