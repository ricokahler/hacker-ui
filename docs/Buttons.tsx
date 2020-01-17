import React from 'react';
import {
  createStyles,
  PropsFromStyles,
  useTheme,
  FilledButton,
  GhostButton,
  OutlineButton,
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
  section: css`
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
  card: css`
    background-color: ${theme.colors.surface};
    padding: ${theme.space(1)};
    box-shadow: ${theme.shadows.standard};
    margin-bottom: ${theme.gap(1)};
    align-self: flex-start;
    max-width: 100%;
    width: ${theme.block(4.5)};
  `,
  cardTitle: css`
    ${theme.fonts.h4}
  `,
  cardDescription: css`
    ${theme.fonts.body2}
    margin-bottom: ${theme.space(1)};
  `,
  cardActions: css`
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

interface Props extends PropsFromStyles<typeof useStyles> {}

function Buttons(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();

  return (
    <Root>
      <h1 className={styles.title}>Buttons</h1>
      <div className={styles.section}>
        <h2 className={styles.label}>Filled Buttons</h2>
        <p className={styles.description}>Use these for primary actions.</p>
        <div className={styles.buttons}>
          <FilledButton color={theme.colors.brand}>Okay</FilledButton>
          <FilledButton color={theme.colors.accent}>Done</FilledButton>
          <FilledButton color={theme.colors.bland}>Boring</FilledButton>
          <FilledButton color={theme.colors.danger}>Delete</FilledButton>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.label}>Outline Buttons</h2>
        <p className={styles.description}>
          An in-between of the filled button and the ghost button
        </p>
        <div className={styles.buttons}>
          <OutlineButton color={theme.colors.brand}>Okay</OutlineButton>
          <OutlineButton color={theme.colors.accent}>Done</OutlineButton>
          <OutlineButton color={theme.colors.bland}>Boring</OutlineButton>
          <OutlineButton color={theme.colors.danger}>Delete</OutlineButton>
        </div>
      </section>

      <section className={styles.section}>
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
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Try them together!</h2>
        <p className={styles.cardDescription}>
          Pair the different buttons to put emphasis on certain actions.
        </p>
        <div className={styles.cardActions}>
          <GhostButton color={theme.colors.bland}>Cancel</GhostButton>
          <FilledButton color={theme.colors.brand}>Okay</FilledButton>
        </div>
      </section>

      <section className={styles.section}>
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
            <OutlineButton disabled color={theme.colors.brand}>
              Okay
            </OutlineButton>
            <OutlineButton disabled color={theme.colors.accent}>
              Done
            </OutlineButton>
            <OutlineButton disabled color={theme.colors.bland}>
              Boring
            </OutlineButton>
            <OutlineButton disabled color={theme.colors.danger}>
              Delete
            </OutlineButton>
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
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>Links and more</h2>
        <p className={styles.description}>
          You can pick any component to be the root component.
        </p>
        <div className={styles.buttons}>
          <OutlineButton
            color={theme.colors.accent}
            // eslint-disable-next-line
            component={props => <a href="#" {...props} />}
          >
            Link
          </OutlineButton>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>Sizes</h2>
        <p className={styles.description}>Small, standard, and large.</p>

        <div className={styles.buttonRows}>
          <div className={styles.buttons}>
            <FilledButton size="large">Large</FilledButton>
            <OutlineButton size="large" color={theme.colors.accent}>
              Okay
            </OutlineButton>
          </div>
          <div className={styles.buttons}>
            <FilledButton color={theme.colors.bland}>Click</FilledButton>
            <FilledButton color={theme.colors.accent}>Click</FilledButton>
            <GhostButton>Click</GhostButton>
          </div>
          <div className={styles.buttons}>
            <FilledButton size="small" color={theme.colors.accent}>
              Small
            </FilledButton>
            <FilledButton size="small" color={theme.colors.danger}>
              Error
            </FilledButton>
            <OutlineButton size="small" disabled>
              Disabled
            </OutlineButton>
          </div>
        </div>
      </section>
    </Root>
  );
}

export default Buttons;
