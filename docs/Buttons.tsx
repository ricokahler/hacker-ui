import React from 'react';
import { createStyles, PropsFromStyles, useTheme, Button } from 'hacker-ui';
import { Link } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  icons: css`
    & > *:not(:last-child) {
      margin-right: ${theme.space(1.5)};
    }
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
          <Button variant="filled" color={theme.colors.brand}>
            Okay
          </Button>
          <Button variant="filled" color={theme.colors.accent}>
            Done
          </Button>
          <Button variant="filled" color={theme.colors.bland}>
            Boring
          </Button>
          <Button variant="filled" color={theme.colors.danger}>
            Delete
          </Button>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.label}>Outline Buttons</h2>
        <p className={styles.description}>
          An in-between of the filled button and the ghost button
        </p>
        <div className={styles.buttons}>
          <Button variant="outline" color={theme.colors.brand}>
            Okay
          </Button>
          <Button variant="outline" color={theme.colors.accent}>
            Done
          </Button>
          <Button variant="outline" color={theme.colors.bland}>
            Boring
          </Button>
          <Button variant="outline" color={theme.colors.danger}>
            Delete
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>Ghost Buttons</h2>
        <p className={styles.description}>
          These don't have as much emphasis on the page but still signal to the
          user that they're clickable.
        </p>
        <div className={styles.buttons}>
          <Button variant="ghost" color={theme.colors.brand}>
            Okay
          </Button>
          <Button variant="ghost" color={theme.colors.accent}>
            Done
          </Button>
          <Button variant="ghost" color={theme.colors.bland}>
            Boring
          </Button>
          <Button variant="ghost" color={theme.colors.danger}>
            Delete
          </Button>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Try them together!</h2>
        <p className={styles.cardDescription}>
          Pair the different buttons to put emphasis on certain actions.
        </p>
        <div className={styles.cardActions}>
          <Button variant="ghost" color={theme.colors.bland}>
            Cancel
          </Button>
          <Button variant="filled" color={theme.colors.brand}>
            Okay
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>Disabled Buttons</h2>
        <p className={styles.description}>Can’t click these.</p>

        <div className={styles.buttonRows}>
          <div className={styles.buttons}>
            <Button disabled color={theme.colors.brand}>
              Okay
            </Button>
            <Button disabled color={theme.colors.accent}>
              Done
            </Button>
            <Button disabled color={theme.colors.bland}>
              Boring
            </Button>
            <Button disabled color={theme.colors.danger}>
              Delete
            </Button>
          </div>

          <div className={styles.buttons}>
            <Button variant="outline" disabled color={theme.colors.brand}>
              Okay
            </Button>
            <Button variant="outline" disabled color={theme.colors.accent}>
              Done
            </Button>
            <Button variant="outline" disabled color={theme.colors.bland}>
              Boring
            </Button>
            <Button variant="outline" disabled color={theme.colors.danger}>
              Delete
            </Button>
          </div>

          <div className={styles.buttons}>
            <Button variant="ghost" disabled color={theme.colors.brand}>
              Okay
            </Button>
            <Button variant="ghost" disabled color={theme.colors.accent}>
              Done
            </Button>
            <Button variant="ghost" disabled color={theme.colors.bland}>
              Boring
            </Button>
            <Button variant="ghost" disabled color={theme.colors.danger}>
              Delete
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>Links and more</h2>
        <p className={styles.description}>
          You can pick any component to be the root component.
        </p>
        <div className={styles.buttons}>
          <Button
            variant="outline"
            color={theme.colors.accent}
            // eslint-disable-next-line
            component={(props: any) => <a href="#" {...props} />}
          >
            Standard Link
          </Button>
          <Button
            color={theme.colors.accent}
            component={(props: any) => <Link to="/buttons" {...props} />}
          >
            React Router Link
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>Sizes</h2>
        <p className={styles.description}>Small, standard, and large.</p>

        <div className={styles.buttonRows}>
          <div className={styles.buttons}>
            <Button color={theme.colors.brand} size="large">
              <span>Large</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
            <Button variant="outline" size="large" color={theme.colors.accent}>
              Okay
            </Button>
          </div>
          <div className={styles.buttons}>
            <Button color={theme.colors.bland}>Click</Button>
            <Button color={theme.colors.accent}>Click</Button>
            <Button variant="ghost">Click</Button>
          </div>
          <div className={styles.buttons}>
            <Button size="small" color={theme.colors.accent}>
              Small
            </Button>
            <Button size="small" color={theme.colors.danger}>
              Error
            </Button>
            <Button variant="outline" size="small" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>Icon Buttons</h2>
        <p>There like button, but for icons.</p>
        <div className={styles.buttonRows}>
          <div className={styles.icons}>
            <Button shape="icon" size="small" color={theme.colors.brand}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
            <Button shape="icon" color={theme.colors.accent} size="small">
              <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </Button>
          </div>
          <div className={styles.icons}>
            <Button shape="icon" color={theme.colors.brand}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
            <Button shape="icon" color={theme.colors.accent}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>

          <div className={styles.buttons}>
            <Button shape="icon" size="large" color={theme.colors.brand}>
              <FontAwesomeIcon icon={faArrowRight} size="lg" />
            </Button>
            <Button shape="icon" size="large" color={theme.colors.accent}>
              <FontAwesomeIcon icon={faArrowRight} size="lg" />
            </Button>
            <Button shape="icon" size="large" color={theme.colors.danger}>
              <FontAwesomeIcon icon={faArrowRight} size="lg" />
            </Button>
          </div>
        </div>
      </section>
    </Root>
  );
}

export default Buttons;
