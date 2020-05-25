import React from 'react';
import { ObjectInspector } from 'react-inspector';
import { useTheme, createStyles, PropsFromStyles } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    color: black;
    background-color: white;
    margin: ${theme.gap(1)};
    ${theme.media.down('tablet')} {
      margin: ${theme.gap(1)} 0;
    }
    box-shadow: ${theme.shadows.standard};
    padding: ${theme.space(1)};
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function ThemeExplorerExample(props: Props) {
  const { Root } = useStyles(props);
  const theme = useTheme();

  return (
    <Root>
      <ObjectInspector data={theme} />
    </Root>
  );
}

export default ThemeExplorerExample;
