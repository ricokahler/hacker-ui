import React from 'react';
import { createStyles, PropsFromStyles, Button, useTheme } from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    margin: auto;
    align-self: center;
    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function GhostButtons(props: Props) {
  const { Root } = useStyles(props);
  const theme = useTheme();

  return (
    <Root>
      <Button color={theme.colors.brand}>Brfand</Button>
      <Button color={theme.colors.accent}>Accent</Button>
      <Button color={theme.colors.bland}>Bland</Button>
      <Button color={theme.colors.warning}>Warning</Button>
      <Button color={theme.colors.danger}>Danger</Button>
    </Root>
  );
}

export default GhostButtons;
