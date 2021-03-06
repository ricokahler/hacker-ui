import React from 'react';
import {
  createStyles,
  PropsFromStyles,
  mix,
  readableColor,
  transparentize,
} from 'react-style-system';

const useStyles = createStyles(({ css, theme, surface }) => ({
  root: css`
    color: ${readableColor(surface)};
    padding: ${theme.gap(1)};
    ${theme.media.down('tablet')} {
      padding: ${theme.space(1)};
    }

    width: 1024px;
    max-width: 100%;
    margin: 0 auto;
    margin-bottom: calc(50vh - ${theme.block(2)});

    & > h1 {
      ${theme.h3};
      margin-bottom: ${theme.space(0.5)};
    }

    & > h2 {
      ${theme.h5};
      margin-top: ${theme.gap(1)};
      margin-bottom: ${theme.space(1)};
    }

    & > h3 {
      ${theme.h6};
    }

    & > p + h3 {
      margin-top: ${theme.gap(1)};
    }

    & > p {
      ${theme.body1};
      max-width: ${theme.block(7)};
      margin-bottom: ${theme.space(1)} !important;
    }

    & > pre {
      background-color: #2d2d2d;
      padding: ${theme.space(1)};
      color: white;
      font-size: 0.8rem;

      & code {
        background-color: transparent;
        padding: 0;
      }
    }

    & code {
      background-color: ${mix(theme.bland, surface, 0.7)};
      padding: 0 ${theme.space(0.25)};
    }

    & ul {
      & > * + * {
        margin-top: ${theme.space(0.5)};
      }
    }

    & a:not(.hui-anchor) {
      color: ${theme.accent};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    & > hr {
      margin: ${theme.space(1.5)} 0;
      border: 1px solid ${transparentize(readableColor(theme.surface), 0.9)};
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
