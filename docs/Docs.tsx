import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useCssReset, createStyles, StyleProps } from 'hacker-ui';

import Nav from './Nav';
import AppBar from './AppBar';

import NoRoute from './NoRoute';
import Buttons from './Buttons';
import Welcome from './Welcome';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    height: 100%;
    overflow: hidden;
    display: flex;
    background-color: ${theme.colors.surface};
  `,
  nav: css`
    flex: 0 0 auto;
  `,
  content: css`
    flex: 1 1 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  `,
  appBar: css`
    flex: 0 0 auto;
  `,
  main: css`
    flex: 1 1 auto;
    display: flex;
    overflow: auto;
  `,
}));

interface Props extends StyleProps<typeof useStyles> {}

function Docs(props: Props) {
  useCssReset();
  const { Root, styles } = useStyles(props);

  return (
    <Root>
      <Nav className={styles.nav} />
      <div className={styles.content}>
        <AppBar className={styles.appBar} />
        <main className={styles.main}>
          <Switch>
            <Route path="/404" component={NoRoute} />
            <Route path="/" exact component={Welcome} />
            <Route path="/buttons" component={Buttons} />
            <Redirect to="/404" />
          </Switch>
        </main>
      </div>
    </Root>
  );
}

export default Docs;
