import React from 'react';
import {
  createStyles,
  PropsFromStyles,
  useTheme,
  readableColor,
} from 'react-style-system';
import { Button, Emoji, useMediaQuery } from 'hacker-ui';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import AppBar from './AppBar';

const useStyles = createStyles(({ css, theme, surface }) => ({
  root: css`
    background-color: ${surface};
    color: ${readableColor(surface)};
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    max-height: 100%;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      content: ' ';
      pointer-events: none;
      background: linear-gradient(transparent 75%, rgba(0, 0, 0, 0.1));
    }
  `,
  header: css`
    border-bottom: 1px solid ${theme.bland};
  `,
  main: css`
    flex: 1 1 auto;
    overflow: auto;
    display: flex;
  `,
  container: css`
    margin: auto;
    width: ${theme.media.tablet};
    max-width: 100%;
    padding: ${theme.gap(1)};

    ${theme.media.down('mobile')} {
      padding: ${theme.space(1)};
    }
  `,
  title: css`
    ${theme.h2};
    display: flex;
    align-items: center;
  `,
  subtitle: css`
    ${theme.h4};
    margin-bottom: ${theme.space(1)};
  `,
  description: css`
    ${theme.body1};
    margin-bottom: ${theme.space(1)};
  `,
  logo: css`
    color: ${theme.accent};
    margin-right: ${theme.space(1)};
  `,
  logoRect: css``,
  buttons: css`
    display: flex;
    margin-bottom: ${theme.gap(1)};
    overflow: hidden;

    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
  button: css`
    width: ${theme.block(2)};
    ${theme.media.down('mobile')} {
      width: ${theme.block(1.6)};
    }
  `,
  features: css`
    ${theme.body1};
    display: grid;
    grid-template-columns: repeat(2, minmax(min-content, 248px));
    list-style-type: none;
    padding: 0;
    gap: ${theme.space(1)};

    ${theme.media.down('tablet')} {
      ${theme.body2};
    }
  `,
  feature: css`
    display: flex;
    align-items: center;

    & > * + * {
      margin-left: ${theme.space(1)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function Landing(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.media.down('mobile'));

  return (
    <Root>
      <AppBar onOpenMobileNav={() => {}} />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Hacker UI</h1>
          <p className={styles.subtitle}>a simple component library</p>
          <p className={styles.description}>
            It's lean, themable, and packed with examples.
          </p>
          <div className={styles.buttons}>
            <Button
              className={styles.button}
              color={theme.brand}
              variant="filled"
              size={isMobile ? 'standard' : 'large'}
              component="a"
              // @ts-ignore
              href="https://github.com/hui-org/hacker-ui"
            >
              Github
            </Button>
            <Button
              className={styles.button}
              component={Link}
              variant="filled"
              size={isMobile ? 'standard' : 'large'}
              // @ts-ignore
              to="/intro/what-is-hacker-ui"
            >
              <span>Get Started</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
          <ul className={styles.features}>
            <li className={styles.feature}>
              <Emoji>
                <span role="img" aria-label="">
                  📦
                </span>
              </Emoji>
              <span>Small&nbsp;&lt;&nbsp;20kB</span>
            </li>
            <li className={styles.feature}>
              <Emoji>
                <span role="img" aria-label="">
                  🌳
                </span>
              </Emoji>
              <span>Tree Shakable</span>
            </li>
            <li className={styles.feature}>
              <Emoji>
                <span role="img" aria-label="">
                  🎨
                </span>
              </Emoji>
              <span>Themable</span>
            </li>
            <li className={styles.feature}>
              <Emoji>
                <span role="img" aria-label="">
                  🌗
                </span>
              </Emoji>
              <span>Dark Mode</span>
            </li>
            <li className={styles.feature}>
              <Emoji>
                <span role="img" aria-label="">
                  🧩
                </span>
              </Emoji>
              <span>20+ Components</span>
            </li>
            <li className={styles.feature}>
              <Emoji>
                <span role="img" aria-label="">
                  🎆
                </span>
              </Emoji>
              <span>25+ Examples</span>
            </li>
            {/* TODO: uncomment when tested with SSR */}
            {/* <li className={styles.feature}>
              <Emoji>
                <span role="img" aria-label="">
                  🚀
                </span>
              </Emoji>
              <span>SSR Capable</span>
            </li> */}
            <li className={styles.feature}>
              <Emoji>
                <span role="img" aria-label="">
                  ✏️
                </span>
              </Emoji>
              <span>CSS-in-JS</span>
            </li>
            {/* <li className={styles.feature}>
              <Emoji>
                <span role="img" aria-label="">
                  🤝
                </span>
              </Emoji>
              <span>Full TypeScript Support</span>
            </li> */}
            <li className={styles.feature}>
              <Emoji>
                <span role="img" aria-label="">
                  💪
                </span>
              </Emoji>
              <span>Built with TypeScript</span>
            </li>
          </ul>
        </div>
      </main>
    </Root>
  );
}

export default Landing;
