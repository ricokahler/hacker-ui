function delay(milliseconds: number): Promise<'delay'> {
  return new Promise(resolve =>
    setTimeout(() => resolve('delay'), milliseconds),
  );
}

export default delay;
