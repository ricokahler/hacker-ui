import React, { useState } from 'react';
import {
  createStyles,
  PropsFromStyles,
  Chip,
  ChipThumbnail,
  CheckIcon,
  Button,
  TimesIcon,
} from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    padding: ${theme.gap(1)};
    & > *:not(:last-child) {
      margin-bottom: ${theme.gap(1)};
    }
  `,
  title: css`
    ${theme.fonts.h3};
  `,
  chipRow: css`
    display: flex;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function Chips(props: Props) {
  const { Root, styles } = useStyles(props);
  const [clicked, setClicked] = useState(false);

  return (
    <Root>
      <h1 className={styles.title}>Chips</h1>
      <div className={styles.chipRow}>
        <Chip>
          <span>Icon Button</span>

          <Button shape="icon" size="small" variant="ghost">
            <TimesIcon />
          </Button>
        </Chip>

        <Chip clickable onClick={() => setClicked(!clicked)}>
          {clicked && (
            <ChipThumbnail>
              <CheckIcon />
            </ChipThumbnail>
          )}

          <span>Clickable</span>
        </Chip>

        <Chip>Non-interactive</Chip>

        <Chip>
          <ChipThumbnail>
            <img alt="Example" src="https://www.fillmurray.com/50/100" />
          </ChipThumbnail>
          <span>With picture</span>
        </Chip>
      </div>
      <div className={styles.chipRow}>
        <Chip variant="filled">
          <span>Icon Button</span>

          <Button shape="icon" size="small" variant="ghost">
            <TimesIcon />
          </Button>
        </Chip>

        <Chip variant="filled" clickable onClick={() => setClicked(!clicked)}>
          {clicked && (
            <ChipThumbnail>
              <CheckIcon />
            </ChipThumbnail>
          )}

          <span>Clickable</span>
        </Chip>

        <Chip variant="filled">Non-interactive</Chip>

        <Chip variant="filled">
          <ChipThumbnail>
            <img alt="Example" src="https://www.fillmurray.com/50/100" />
          </ChipThumbnail>
          <span>With picture</span>
        </Chip>
      </div>
    </Root>
  );
}

export default Chips;
