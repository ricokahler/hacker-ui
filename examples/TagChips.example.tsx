import React from 'react';
import { Chip } from 'hacker-ui';
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css``,
  card: css`
    width: ${theme.tablet};
    max-width: 100%;

    margin: ${theme.gap(1)} auto;
    padding: ${theme.gap(1)};
    ${theme.media.down('tablet')} {
      padding: ${theme.space(1)};
    }

    background-color: ${theme.surface};
    box-shadow: ${theme.shadows.standard};
    display: flex;
    flex-direction: column;
  `,
  title: css`
    ${theme.h3};
  `,
  subtitle: css`
    ${theme.body1};
    margin-bottom: ${theme.space(1)};
  `,
  tags: css`
    display: flex;
    align-items: center;
    margin-bottom: ${theme.space(1)};
    flex-wrap: wrap;
    & > * {
      margin-right: ${theme.space(0.5)};
      margin-bottom: ${theme.space(0.5)};
    }
  `,
  body: css`
    ${theme.body1};
    line-height: 1.7;
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function TagChipsExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();

  return (
    <Root>
      <section className={styles.card}>
        <h3 className={styles.title}>Building a Component Library</h3>
        <p className={styles.subtitle}>
          By Rico Kahler | {new Date().toLocaleString()}
        </p>
        <div className={styles.tags}>
          <Chip color={theme.bland}>React.js</Chip>
          <Chip color={theme.bland}>JavaScript</Chip>
          <Chip color={theme.bland}>Programming</Chip>
        </div>
        <p className={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
    </Root>
  );
}

export default TagChipsExample;
