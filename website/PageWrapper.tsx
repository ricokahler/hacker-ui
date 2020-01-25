import React from 'react';
import { createStyles, PropsFromStyles } from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    padding: ${theme.gap(1)};
    width: 1024px;
    max-width: 100%;
    margin: 0 auto;

    & > h1 {
      ${theme.fonts.h3};
    }

    & > h2 {
      ${theme.fonts.h4};
    }

    & > h3 {
      ${theme.fonts.h5};
    }

    & > p {
      ${theme.fonts.body1};
    }

    & > *:not(:last-child) {
      margin-bottom: ${theme.space(1)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {
  children: React.ReactNode;
}

function PageWrapper(props: Props) {
  const { Root, styles, ...restOfProps } = useStyles(props);

  return <Root {...restOfProps} />;
}

export default PageWrapper;
