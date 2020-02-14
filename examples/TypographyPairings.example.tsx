import React from 'react';
import {
  useTheme,
  createStyles,
  PropsFromStyles,
  FormControl,
  Label,
  HelperText,
  Select,
  Button,
} from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    flex-direction: column;
  `,
  pairing: css`
    margin-bottom: ${theme.gap(1)};
  `,
  title: css`
    ${theme.fonts.h2};
    line-height: 1;
  `,
  subtitle: css`
    ${theme.fonts.subtitle1};
    line-height: 1;
  `,
  card: css`
    width: ${theme.block(5)};
    margin: 0 auto;
    margin-bottom: ${theme.gap(1)};
    max-width: 100%;
    padding: ${theme.space(1)};
    background-color: ${theme.colors.surface};
    box-shadow: ${theme.shadows.standard};
    display: flex;
    flex-direction: column;
  `,
  cardTitle: css`
    ${theme.fonts.h4};
  `,
  cardDescription: css`
    ${theme.fonts.body1};
    margin-bottom: ${theme.space(1)};
  `,
  label: css`
    font-weight: bold;
  `,
  subtext: css`
    ${theme.fonts.body2};
    margin-bottom: ${theme.space(1)};
  `,
  formControl: css`
    margin-bottom: ${theme.space(1)};
  `,
  actions: css`
    display: flex;
    justify-content: flex-end;
    & > *:not(:first-child) {
      margin-left: ${theme.space(0.5)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function TypographyPairingsExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();

  return (
    <Root>
      <section className={styles.pairing}>
        <h3 className={styles.title}>Hacker UI</h3>
        <p className={styles.subtitle}>— a simple design system</p>
      </section>

      <section className={styles.card}>
        <h3 className={styles.cardTitle}>Welcome</h3>
        <p className={styles.cardDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <p className={styles.subtext}>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>

        <FormControl className={styles.formControl}>
          <Label className={styles.label}>Select one — body1 bold</Label>
          <Select>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </Select>
          <HelperText>Helper Text — caption</HelperText>
        </FormControl>

        <div className={styles.actions}>
          <Button color={theme.colors.bland}>Cancel</Button>
          <Button variant="filled">Go!</Button>
        </div>
      </section>
    </Root>
  );
}

export default TypographyPairingsExample;
