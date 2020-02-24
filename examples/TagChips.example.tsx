import React from 'react';
import { createStyles, PropsFromStyles, Chip, useTheme } from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css``,
  card: css`
    width: ${theme.breakpoints.tablet};
    max-width: 100%;

    margin: ${theme.gap(1)} auto;
    padding: ${theme.gap(1)};
    ${theme.breakpoints.down(theme.breakpoints.tablet)} {
      padding: ${theme.space(1)};
    }

    background-color: ${theme.colors.surface};
    box-shadow: ${theme.shadows.standard};
    display: flex;
    flex-direction: column;
  `,
  title: css`
    ${theme.fonts.h3};
    ${theme.breakpoints.down(theme.breakpoints.tablet)} {
      ${theme.fonts.h4};
    }
  `,
  subtitle: css`
    ${theme.fonts.body1};
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
    ${theme.fonts.body1};
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
          <Chip color={theme.colors.bland}>React.js</Chip>
          <Chip color={theme.colors.bland}>JavaScript</Chip>
          <Chip color={theme.colors.bland}>Programming</Chip>
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
