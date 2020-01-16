function tryGetCurrentFileName(): string {
  if (process.env.NODE_ENV === 'production') return '';

  // TODO: try this out in other browsers
  const e = new Error();
  const { stack } = e;
  if (!stack) return '';

  const match = /at.*\/(.*)\.(?:t|j)sx?.*\(.*\)/.exec(stack);
  if (!match) return '';

  const fileName = match[1];
  return fileName.replace(/\./g, '-').replace(/[^a-z-_]/gi, '-');
}

export default tryGetCurrentFileName;
