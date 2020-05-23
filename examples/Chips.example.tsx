import React, { useState } from 'react';
import { Chip, ChipThumbnail, Button, TimesIcon, CheckIcon } from 'hacker-ui';
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';

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
  const [deleted, setDeleted] = useState(false);

  return (
    <Root>
      <Chip variant="outlined">Outlined</Chip>

      <Chip variant="filled">Filled</Chip>

      <Chip variant="filled" color={theme.danger}>
        Danger
      </Chip>

      <Chip clickable onClick={() => alert('You clicked!')}>
        Clickable
      </Chip>

      <Chip clickable onClick={() => setClicked(!clicked)} color={theme.brand}>
        {clicked && (
          <ChipThumbnail>
            <CheckIcon />
          </ChipThumbnail>
        )}
        <span>Thumbnail</span>
      </Chip>

      {!deleted && (
        <Chip variant="filled">
          <span>Inner Button</span>
          <Button shape="icon" size="small" onClick={() => setDeleted(true)}>
            <TimesIcon />
          </Button>
        </Chip>
      )}

      <Chip disabled clickable>
        Disabled
      </Chip>
    </Root>
  );
}

export default ChipsExample;
