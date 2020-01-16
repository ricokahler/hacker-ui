function tryGetCurrentFileName() {
  if (process.env.NODE_ENV === 'production') return 'hui';

  const e = new Error();
  const { stack } = e;
  if (!stack) return 'hui';

  const match = /at.*\/(.*)\.(?:t|j)sx?.*\(.*\)/.exec(stack);
  if (!match) return 'hui';

  const fileName = match[1];
  return fileName.replace(/\./g, '-').replace(/[^a-z-_]/gi, '-');
}

export default tryGetCurrentFileName;
