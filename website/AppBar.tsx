import React from 'react';
import { Tooltip, Button, useMediaQuery } from 'hacker-ui';
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import useDarkMode from './useDarkMode';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    height: ${theme.block(0.75)};
    border-bottom: 1px solid ${theme.bland};
    display: flex;
    align-items: center;
    padding: ${theme.space(1)};
  `,
  navButton: css`
    margin-right: ${theme.space(1)};
  `,
  githubButton: css`
    margin-left: auto;
    margin-right: ${theme.space(1)};
  `,
  darkModeButton: css``,
}));

interface Props extends PropsFromStyles<typeof useStyles> {
  onOpenMobileNav: () => void;
}

function AppBar(props: Props) {
  const { Root, styles, onOpenMobileNav } = useStyles(props);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.media.down('tablet'));
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <Root>
      {isMobile && (
        <Tooltip title="Open nav" position="right">
          {(tooltipProps) => (
            <Button
              {...tooltipProps}
              onClick={onOpenMobileNav}
              className={styles.navButton}
              aria-label="Open nav"
              shape="icon"
              color="black"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </Button>
          )}
        </Tooltip>
      )}

      <Tooltip title="Contribute on GitHub" position="left">
        {(tooltipProps) => (
          <Button
            className={styles.githubButton}
            aria-label="Contribute on GitHub"
            shape="icon"
            color="black"
            component="a"
            // @ts-ignore
            href="https://github.com/ricokahler/hacker-ui"
            {...tooltipProps}
          >
            <FontAwesomeIcon icon={faGithub} size="3x" />
          </Button>
        )}
      </Tooltip>

      <Tooltip title="Toggle dark mode" position="left">
        {(tooltipProps) => (
          <Button
            className={styles.darkModeButton}
            aria-label="Dark mode"
            shape="icon"
            color="black"
            onClick={() => setDarkMode((darkMode) => !darkMode)}
            {...tooltipProps}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="3x" />
          </Button>
        )}
      </Tooltip>
    </Root>
  );
}

export default AppBar;
