import React, { useState } from 'react';
import { Chip, Button } from 'hacker-ui';
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
  `,
  card: css`
    margin: ${theme.gap(1)} auto;
    width: ${theme.breakpoints.mobile};
    max-width: 100%;
    background-color: ${theme.colors.surface};
    box-shadow: ${theme.shadows.standard};
    padding: ${theme.space(1)};
    display: flex;
    flex-direction: column;
  `,
  title: css`
    ${theme.fonts.h4};
  `,
  description: css`
    ${theme.fonts.body1};
    margin-bottom: ${theme.space(1)};
  `,
  label: css`
    ${theme.fonts.caption};
    margin-bottom: ${theme.space(0.5)};
  `,
  hr: css`
    width: 100%;
    margin-bottom: ${theme.space(1)};
  `,
  chips: css`
    margin-bottom: ${theme.space(2)};
    & > *:not(:last-child) {
      margin-right: ${theme.space(0.5)};
    }
  `,
  chip: css`
    margin-bottom: ${theme.space(0.5)};
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function ChoiceChipsExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();
  const [type, setType] = useState<
    'extra-soft' | 'soft' | 'medium' | 'hard' | null
  >(null);

  return (
    <Root>
      <section className={styles.card}>
        <h3 className={styles.title}>Toothbrush</h3>
        <p className={styles.description}>
          Our company takes pride in making handmade toothbrushes. Our
          toothbrushes are available in 4 different bristle types from Extra
          Soft to Hard.
        </p>
        <hr className={styles.hr} />
        <div className={styles.label}>Select type:</div>
        <div className={styles.chips} role="radiogroup">
          <Chip
            clickable
            variant={type === 'extra-soft' ? 'filled' : 'outlined'}
            onClick={() => setType('extra-soft')}
            role="radio"
            aria-checked={type === 'extra-soft'}
          >
            Extra Soft
          </Chip>
          <Chip
            clickable
            variant={type === 'soft' ? 'filled' : 'outlined'}
            onClick={() => setType('soft')}
            role="radio"
            aria-checked={type === 'soft'}
          >
            Soft
          </Chip>
          <Chip
            clickable
            variant={type === 'medium' ? 'filled' : 'outlined'}
            onClick={() => setType('medium')}
            role="radio"
            aria-checked={type === 'medium'}
          >
            Medium
          </Chip>
          <Chip
            clickable
            variant={type === 'hard' ? 'filled' : 'outlined'}
            onClick={() => setType('hard')}
            role="radio"
            aria-checked={type === 'hard'}
          >
            Hard
          </Chip>
        </div>
        <Button variant="filled" color={theme.colors.brand}>
          Add to Cart
        </Button>
      </section>
    </Root>
  );
}

export default ChoiceChipsExample;
