import React from 'react';
import { createStyles, PropsFromStyles, Anchor } from 'hacker-ui';
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
  return (
    <Root>
      <h1 className={styles.title}>Links</h1>
      <p className={styles.text}>
        <Anchor href="#">This</Anchor> is a link. Links are stuff and things.{' '}
        <Anchor component={(props: any) => <Link to="/links" {...props} />}>
          React router link
        </Anchor>
      </p>
    </Root>
  );
}

export default Links;
