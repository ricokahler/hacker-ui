import React from 'react';
import { Anchor } from 'hacker-ui';
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    & > *:not(:last-child) {
      margin-bottom: ${theme.space(1)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function LinksExample(props: Props) {
  const { Root } = useStyles(props);
  const theme = useTheme();

  return (
    <Root>
      <div>
        This is a simple <Anchor href="#">link</Anchor>.
      </div>

      <div>
        You can also change the color of the link{' '}
        <Anchor href="#" color={theme.colors.brand}>
          link
        </Anchor>{' '}
        using the standard <code>color</code> prop.
      </div>

      <div>
        <Anchor href="#" color={theme.colors.danger}>
          Danger link
        </Anchor>{' '}
      </div>

      <div>
        <Anchor href="#" color={theme.colors.warning}>
          Warning link
        </Anchor>
      </div>
    </Root>
  );
}

export default LinksExample;
