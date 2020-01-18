import React from 'react';
import { createStyles, PropsFromStyles, Anchor, useTheme } from 'hacker-ui';
import { Link } from 'react-router-dom';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    padding: ${theme.gap(1)};
  `,
  title: css`
    ${theme.fonts.h3}
  `,
  text: css`
    ${theme.fonts.body1}
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function Links(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();

  return (
    <Root>
      <h1 className={styles.title}>Links</h1>
      <p className={styles.text}>
        <Anchor href="#">This</Anchor> is a link. Links are stuff and things.{' '}
        <Anchor component={(props: any) => <Link to="/links" {...props} />}>
          This is a <code>react-router</code> link.
        </Anchor>{' '}
        This link is a different{' '}
        <Anchor color={theme.colors.accent} href="#">
          color
        </Anchor>
        .{' '}
        <Anchor href="#" color={theme.colors.danger}>
          Danger link
        </Anchor>
      </p>
    </Root>
  );
}

export default Links;
