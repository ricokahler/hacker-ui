import React from 'react';
import {
  createStyles,
  StyleProps,
  readableColor,
  useTheme,
} from 'react-style-system';
import { Button, useMediaQuery } from 'hacker-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const useStyles = createStyles(({ css, theme, surface }) => ({
  root: css`
    color: ${readableColor(surface)};
    height: 100%;
    display: flex;
    overflow: auto;
  `,
  content: css`
    margin: auto;
    text-align: center;
    width: ${theme.media.mobile};
    max-width: 100%;
    padding: ${theme.space(1)};
  `,
  title: css`
    ${theme.h1};
  `,
  subtitle: css`
    ${theme.h5};
    margin-bottom: ${theme.space(1)};
  `,
}));

interface Props extends StyleProps<typeof useStyles> {}

function NoRoute(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.media.down('mobile'));

  return (
    <Root>
      <div className={styles.content}>
        <h2 className={styles.title}>404</h2>
        <p className={styles.subtitle}>
          Sorry, we couldn't find the page you were looking for.
        </p>
        <Button
          color={readableColor(theme.surface)}
          size={isMobile ? 'standard' : 'large'}
          variant="outlined"
          component={Link}
          // @ts-ignore
          to="/"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back Home</span>
        </Button>
      </div>
    </Root>
  );
}

export default NoRoute;
