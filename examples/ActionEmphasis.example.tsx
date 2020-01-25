import React from 'react';
import { Button, createStyles, useTheme, PropsFromStyles } from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    padding: ${theme.gap(1)} 0;
  `,
  card: css`
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: ${theme.space(1)};
    box-shadow: ${theme.shadows.standard};
    background-color: ${theme.colors.surface};
    width: ${theme.block(4)};
  `,
  title: css`
    flex: 0 0 auto;
    ${theme.fonts.h4};
  `,
  description: css`
    ${theme.fonts.body1};
    margin-bottom: ${theme.space(1)};
  `,
  actions: css`
    flex: 0 0 auto;
    display: flex;
    justify-content: flex-end;
    & > *:not(:first-child) {
      margin-left: ${theme.space(1)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function ActionEmphasis(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();

  return (
    <Root>
      <section className={styles.card}>
        <div className={styles.title}>Try them together!</div>
        <p className={styles.description}>
          You can put emphasis on certain actions but using a combination of
          ghost, outlined, and filled buttons.
        </p>
        <div className={styles.actions}>
          <Button variant="ghost" color={theme.colors.bland}>
            Cancel
          </Button>
          <Button variant="filled" color={theme.colors.brand}>
            Okay
          </Button>
        </div>
      </section>
    </Root>
  );
}

export default ActionEmphasis;
