import React from 'react';
import { ObjectInspector } from 'react-inspector';
import { useTheme, createStyles, PropsFromStyles } from 'react-style-system';

const useStyles = createStyles(({ css, theme, staticVar }) => ({
  root: css`
    background-color: ${theme.colors.surface};
    margin: ${theme.gap(1)};
    ${staticVar(theme.breakpoints.down(theme.breakpoints.tablet))} {
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
