import createDynamicColorPalette from './createDynamicColorPalette';

it('black on white', () => {
  const result = createDynamicColorPalette('#000', '#fff');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "asBackground": "#000",
      "bgContrast": "#fff",
      "onSurface": "#000",
    }
  `);
});

it('light color on white', () => {
  const result = createDynamicColorPalette('#eee', '#fff');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "asBackground": "#000",
      "bgContrast": "#fff",
      "onSurface": "#000",
    }
  `);
});

it('grey on white', () => {
  const result = createDynamicColorPalette('#ccc', '#fff');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "asBackground": "#ccc",
      "bgContrast": "#000",
      "onSurface": "#000",
    }
  `);
});

it('white on black', () => {
  const result = createDynamicColorPalette('#fff', '#000');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "asBackground": "#fff",
      "bgContrast": "#000",
      "onSurface": "#fff",
    }
  `);
});

it('gray on black', () => {
  const result = createDynamicColorPalette('#ccc', '#000');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "asBackground": "#ccc",
      "bgContrast": "#000",
      "onSurface": "#ccc",
    }
  `);
});
