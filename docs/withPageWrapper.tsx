import React from 'react';
import { createStyles } from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    padding: ${theme.gap(1)};
    width: 1024px;
    max-width: 100%;

    & > h1 {
      ${theme.fonts.h3};
    }

    & > *:not(:last-child) {
      margin-bottom: ${theme.space(1)};
    }
  `,
}));

function withPageWrapper(Component: React.ComponentType<any>) {
  function PageWrapper(props: any) {
    const { Root, styles } = useStyles(props);

    return (
      <Root>
        <Component />
      </Root>
    );
  }

  return PageWrapper;
}

export default withPageWrapper;
