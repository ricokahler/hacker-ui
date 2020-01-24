import * as Index from './';

test('list all the modules', () => {
  expect(Object.keys(Index)).toMatchInlineSnapshot(`
    Array [
      "Button",
      "List",
      "ThemeContext",
      "ThemeProvider",
      "createDynamicColorPalette",
      "createStyles",
      "css",
      "defaultTheme",
      "useCssReset",
      "useTheme",
      "createTheme",
      "ListItemButton",
      "Anchor",
      "FormControl",
      "Label",
      "TextInput",
      "HelperText",
      "TextArea",
      "Checkbox",
      "Radio",
      "CheckIcon",
      "CircleIcon",
      "RadioGroup",
      "Switch",
      "ColorProvider",
      "useColorContext",
      "Select",
      "Chip",
      "ChipThumbnail",
      "TimesIcon",
      "Tooltip",
      "Modal",
      "ModalHeader",
      "ModalContent",
      "ModalFooter",
      "ModalActions",
    ]
  `);
});
