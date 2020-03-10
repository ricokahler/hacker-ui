import React, { useState } from 'react';
import { Button, Drawer } from 'hacker-ui';
import { createStyles, PropsFromStyles } from 'react-style-system';

const useStyles = createStyles(({ css, theme, staticVar }) => ({
  root: css`
    display: flex;
  `,
  button: css`
    margin: ${theme.gap(1)} auto;
  `,
  drawer: css`
    padding: ${theme.space(1)} 0;
  `,
  title: css`
    ${staticVar(theme.fonts.h4)};
    margin: 0 ${theme.space(1)};
  `,
  paragraph: css`
    ${staticVar(theme.fonts.body1)};
    margin: 0 ${theme.space(1)};
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function DrawerExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Root>
        <Button
          className={styles.button}
          variant="filled"
          onClick={() => setOpen(!open)}
        >
          Open Drawer
        </Button>
      </Root>

      <Drawer
        className={styles.drawer}
        open={open}
        onClose={() => setOpen(false)}
      >
        <h3 className={styles.title}>This is a drawer</h3>
        <p className={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Drawer>
    </>
  );
}

export default DrawerExample;
