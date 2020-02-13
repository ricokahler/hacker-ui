import React, { useState } from 'react';
import {
  createStyles,
  PropsFromStyles,
  Chip,
  ChipThumbnail,
  Button,
  TimesIcon,
  CheckIcon,
  useTheme,
} from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: ${theme.space(1)};
    & > * {
      margin-right: ${theme.space(1)};
      margin-bottom: ${theme.space(1)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function ChipsExample(props: Props) {
  const { Root } = useStyles(props);
  const theme = useTheme();
  const [clicked, setClicked] = useState(true);

  return (
    <Root>
      <Chip variant="outlined">Outlined</Chip>
      <Chip variant="filled">Filled</Chip>
      <Chip variant="filled" color={theme.colors.danger}>
        Danger
      </Chip>
      <Chip clickable>Clickable</Chip>
      <Chip
        clickable
        onClick={() => setClicked(!clicked)}
        color={theme.colors.brand}
      >
        {clicked && (
          <ChipThumbnail>
            <CheckIcon />
          </ChipThumbnail>
        )}
        <span>Thumbnail</span>
      </Chip>
      <Chip variant="filled">
        <span>Inner Button</span>
        <Button shape="icon" size="small">
          <TimesIcon />
        </Button>
      </Chip>
      <Chip disabled clickable>Disabled</Chip>
    </Root>
  );
}

export default ChipsExample;
