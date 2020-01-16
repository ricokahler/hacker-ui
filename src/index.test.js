import * as Index from './';

test('list all the modules', () => {
  expect(Object.keys(Index)).toMatchInlineSnapshot(`
    Array [
      "createTheme",
      "BaseButton",
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
