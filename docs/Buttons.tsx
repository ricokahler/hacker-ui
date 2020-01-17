import React from 'react';
import { createStyles, StyleProps, FilledButton, useTheme } from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    padding: ${theme.gap(1)};
  `,
  title: css`
    ${theme.fonts.h3}
    margin-bottom: ${theme.space(1)};
  `,
  group: css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${theme.gap(1)};
  `,
  label: css`
    ${theme.fonts.h4};
  `,
  description: css`
    ${theme.fonts.body2}
    margin-bottom: ${theme.space(1)};
  `,
  buttons: css`
    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
}));

interface Props extends StyleProps<typeof useStyles> {}

function Buttons(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();

  return (
    <Root>
      <h1 className={styles.title}>Buttons</h1>
      <div className={styles.group}>
        <h2 className={styles.label}>Filled Buttons</h2>
        <p className={styles.description}>Use these for primary actions.</p>
        <div className={styles.buttons}>
          <FilledButton color={theme.colors.brand}>Okay</FilledButton>
          <FilledButton color={theme.colors.accent}>Done</FilledButton>
          <FilledButton color={theme.colors.bland}>Boring</FilledButton>
          <FilledButton color={theme.colors.danger}>Delete</FilledButton>
        </div>
      </div>

      <div className={styles.group}>
        <h2 className={styles.label}>Disabled Buttons</h2>
        <p className={styles.description}>Can’t click these.</p>
        <div className={styles.buttons}>
          <FilledButton disabled color={theme.colors.brand}>
            Okay
          </FilledButton>
          <FilledButton disabled color={theme.colors.accent}>
            Done
          </FilledButton>
          <FilledButton disabled color={theme.colors.bland}>
            Boring
          </FilledButton>
          <FilledButton disabled color={theme.colors.danger}>
            Delete
          </FilledButton>
        </div>
      </div>
    </Root>
  );
}

export default Buttons;
