import * as Index from './';

test('list all the modules', () => {
  expect(Object.keys(Index)).toMatchInlineSnapshot(`
    Array [
      "createTheme",
      "Button",
      "ThemeContext",
      "ThemeProvider",
      "createDynamicColorPalette",
      "createStyles",
      "css",
      "defaultTheme",
      "useTheme",
    ]
  `);
});
