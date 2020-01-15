/**
 * this is a simple tag that re-exports the string it's given to create css
 * partials without creating a classname
 */
function cssReexport(strings: TemplateStringsArray, ...values: string[]) {
  let combined = '';

  for (let i = 0; i < strings.length; i += 1) {
    const currentString = strings[i];
    const currentValue = values[i] || '';
    combined += currentString + currentValue;
  }

  return combined;
}

export default cssReexport;
