import React from 'react';
import { createStyles, PropsFromStyles } from 'hacker-ui';
import { transparentize } from 'polished';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    padding: ${theme.gap(1)};
    width: 1024px;
    max-width: 100%;
    margin: 0 auto;
    margin-bottom: calc(100vh - ${theme.block(2)});

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
      max-width: ${theme.block(7)};
    }

    & > pre {
      background-color: #2d2d2d;
      padding: ${theme.space(1)};
      color: white;

      & code {
        background-color: transparent;
        padding: 0;
      }
    }

    & code {
      background-color: ${transparentize(0.7, theme.colors.bland)};
      padding: 0 ${theme.space(0.25)};
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
