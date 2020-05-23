import React from 'react';
import { Button } from 'hacker-ui';
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';

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
      <Button color={theme.brand}>Brfand</Button>
      <Button color={theme.accent}>Accent</Button>
      <Button color={theme.bland}>Bland</Button>
      <Button color={theme.warning}>Warning</Button>
      <Button color={theme.danger}>Danger</Button>
    </Root>
  );
}

export default GhostButtons;
