import React, { useState } from 'react';
import { Button, TimesIcon, Chip, ChipThumbnail, CheckIcon } from 'hacker-ui';
import {
  createStyles,
  PropsFromStyles,
  useTheme,
  readableColor,
} from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
  `,
  card: css`
    margin: ${theme.gap(1)} auto;
    width: ${theme.mobile};
    max-width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${theme.surface};
    box-shadow: ${theme.shadows.standard};
  `,
  header: css`
    display: flex;
    align-items: center;
    background-color: ${theme.brand};
    color: ${readableColor(theme.brand)};
    padding: ${theme.space(0.5)};
  `,
  closeButton: css`
    margin-right: ${theme.space(1)};
  `,
  title: css`
    ${theme.h6};
  `,
  label: css`
    ${theme.caption};
    margin-bottom: ${theme.space(0.5)};
  `,
  content: css`
    padding: ${theme.space(1)};
  `,
  chips: css`
    display: flex;
    flex-wrap: wrap;
    & > * {
      margin-right: ${theme.space(0.5)};
      margin-bottom: ${theme.space(0.5)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

const amenities = [
  { displayName: 'Elevator', value: 'elevator' },
  { displayName: 'Washer / dryer', value: 'washer-dryer' },
  { displayName: 'Fireplace', value: 'fireplace' },
  { displayName: 'Wheelchair access', value: 'wheelchair' },
  { displayName: 'Dogs ok', value: 'dogs' },
  { displayName: 'Cats ok', value: 'cats' },
];

function FilterChipsExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();
  const [selectedOptions, setSelectOptions] = useState<{
    [key: string]: boolean;
  }>({});

  const toggle = (set: { [key: string]: boolean }, keyToToggle: string) => {
    // if has, the remove
    if (set[keyToToggle]) {
      return Object.entries(set)
        .filter(([key]) => keyToToggle !== key)
        .reduce((set, [key, value]) => {
          set[key] = value;
          return set;
        }, {} as typeof set);
    }

    // otherwise add to the set
    return {
      ...set,
      [keyToToggle]: true,
    };
  };

  return (
    <Root>
      <section className={styles.card}>
        <div className={styles.header}>
          <Button
            className={styles.closeButton}
            shape="icon"
            surface={theme.brand}
            color={readableColor(theme.brand)}
          >
            <TimesIcon />
          </Button>
          <h3 className={styles.title}>Filter results</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Choose amenities:</div>
          <div className={styles.chips}>
            {amenities.map(({ displayName, value }) => (
              <Chip
                key={value}
                clickable
                onClick={() => setSelectOptions(toggle(selectedOptions, value))}
              >
                {selectedOptions[value] && (
                  <ChipThumbnail>
                    <CheckIcon />
                  </ChipThumbnail>
                )}
                <span>{displayName}</span>
              </Chip>
            ))}
          </div>
        </div>
      </section>
    </Root>
  );
}

export default FilterChipsExample;
