import React from 'react';
import {
  createStyles,
  StyleProps,
  useTheme,
  FilledButton,
  GhostButton,
} from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    padding: ${theme.gap(1)};
    display: flex;
    flex-direction: column;
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
  ghostAndFilled: css`
    background-color: ${theme.colors.surface};
    padding: ${theme.space(1)};
    box-shadow: ${theme.shadows.standard};
    margin-bottom: ${theme.gap(1)};
    align-self: flex-start;
    max-width: 100%;
    width: ${theme.block(4)};
  `,
  cardTitle: css`
    ${theme.fonts.h4}
  `,
  cardDescription: css`
    ${theme.fonts.body2}
    margin-bottom: ${theme.space(1)};
  `,
  buttonActions: css`
    display: flex;
    justify-content: flex-end;
    & > *:not(:first-child) {
      margin-left: ${theme.space(1)};
    }
  `,
  buttonRows: css`
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: ${theme.space(1)};
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
        <h2 className={styles.label}>Ghost Buttons</h2>
        <p className={styles.description}>
          These don't have as much emphasis on the page but still signal to the
          user that they're clickable.
        </p>
        <div className={styles.buttons}>
          <GhostButton color={theme.colors.brand}>Okay</GhostButton>
          <GhostButton color={theme.colors.accent}>Done</GhostButton>
          <GhostButton color={theme.colors.bland}>Boring</GhostButton>
          <GhostButton color={theme.colors.danger}>Delete</GhostButton>
        </div>
      </div>

      <div className={styles.ghostAndFilled}>
        <h2 className={styles.cardTitle}>Try them together!</h2>
        <p className={styles.cardDescription}>
          Pair the different buttons to put emphasis on certain actions.
        </p>
        <div className={styles.buttonActions}>
          <GhostButton color={theme.colors.bland}>Cancel</GhostButton>
          <FilledButton color={theme.colors.brand}>Okay</FilledButton>
        </div>
      </div>

      <div className={styles.group}>
        <h2 className={styles.label}>Disabled Buttons</h2>
        <p className={styles.description}>Can’t click these.</p>

        <div className={styles.buttonRows}>
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

          <div className={styles.buttons}>
            <GhostButton disabled color={theme.colors.brand}>
              Okay
            </GhostButton>
            <GhostButton disabled color={theme.colors.accent}>
              Done
            </GhostButton>
            <GhostButton disabled color={theme.colors.bland}>
              Boring
            </GhostButton>
            <GhostButton disabled color={theme.colors.danger}>
              Delete
            </GhostButton>
          </div>
        </div>
      </div>
    </Root>
  );
}

export default Buttons;
