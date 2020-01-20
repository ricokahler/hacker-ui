import React from 'react';
import { createStyles, StyleProps, List, ListItemButton } from 'hacker-ui';
import { Link } from 'react-router-dom';
import routes from './routes';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    width: ${theme.block(3)};
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,
  header: css`
    flex: 0 0 auto;
    padding: ${theme.space(1)};
    border-bottom: 1px solid ${theme.colors.bland};
    min-height: ${theme.block(0.75)};
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  title: css`
    ${theme.fonts.h5}
  `,
  version: css`
    ${theme.fonts.caption}
  `,
  body: css`
    flex: 1 1 auto;
    overflow: auto;
  `,
  button: css`
    ${theme.fonts.body1}
    align-items: flex-start;
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  routeTitle: css`
    ${theme.fonts.body1}
  `,
  routeBody: css`
    ${theme.fonts.caption}
  `,
}));

interface Props extends StyleProps<typeof useStyles> {}

function Nav(props: Props) {
  const { Root, styles } = useStyles(props, 'aside');

  return (
    <Root>
      <div className={styles.header}>
        <h1 className={styles.title}>Hacker UI</h1>
        <span className={styles.version}>v0.0.0</span>
      </div>
      <nav className={styles.body}>
        <List>
          {routes.map((route, index) => (
            <li key={index}>
              <ListItemButton
                component={(props: any) => <Link to={route.path} {...props} />}
              >
                <div className={styles.routeTitle}>{route.title}</div>
              </ListItemButton>
            </li>
          ))}
        </List>
      </nav>
    </Root>
  );
}

export default Nav;
