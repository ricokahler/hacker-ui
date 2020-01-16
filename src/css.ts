/** @pragma export */
function css(strings: TemplateStringsArray, ...values: string[]) {
  let combined = '';

  for (let i = 0; i < strings.length; i += 1) {
    const currentString = strings[i];
    const currentValue = values[i] || '';
    combined += currentString + currentValue;
  }

  return combined;
}

export default css;
