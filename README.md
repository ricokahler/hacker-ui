# Hacker UI

> A design system for the modern developer.

check back soon

## Goals and Philosophies

- no useless abstractions
- small API footprint = little learning curve
- relatively "low-level" to remove restraints
- composable styles by default, root component overrides
- components are modular/atomic
- unbranded but still aesthetically pleasing
- out-of-the-box dark mode
- themeable with any colors

---

This 👇 is what's currently planned. This is mostly a scratch pad of ideas and will probably change.

## Colors

- brand — main brand color
- accent — branded accent color, primarily used for controls
- danger — for errors, danger text is fine but use it seldomly
- warning — for warnings, use this for icon colors but not text
- info — semantic info color, use this like warning. don't make "info" buttons
- bland — semantic default color, use this for plain controls and dividers. this is

- surface (dynamic)
- contrast (dynamic)

- current (dynamic)

## Components

### Elements

- button
  - ghost (default)
  - filled
  - outlined
- link
- icon button
- text field
  - outlined (default)
  - filled
- checkbox
- radio button
- switch
- select (maybe just native select?)
- tag
- tooltip

### complex ones?

- modal
- drawer
- table
- snack
- useSnackbar
- menu
- menu items
- bottom-nav?
- tabs?
- pagination?
- accordion?

### recipes/examples

- cards/shadows
- typography
- grids
- app bar?
- forms (maybe with react-select or similar?)
- layouts (like: https://ant.design/components/layout/)
- user info (https://ant.design/components/descriptions/)
- show select with react-select or downshift

## Other considerations

grid system-esque mechanism

- spacing unit (16px)
- gap unit (48px)
- block unit (96px)

misc:

- icons?
- useMediaQuery
