import React, { useEffect, useState, memo, Suspense } from 'react';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import { createStyles, PropsFromStyles } from 'react-style-system';
// import { useCssReset } from 'hacker-ui';
import docArray from '../docs';
import flattenDocArray from './flattenDocArray';

import Nav from './Nav';
import AppBar from './AppBar';
import NoRoute from './NoRoute';
import PageWrapper from './PageWrapper';

const routes = flattenDocArray(docArray).map(
  ({ component, ...restOfProps }) => {
    const Component = component as React.ComponentType<any>;

    return {
      component: (props: any) => (
        <PageWrapper>
          <Component {...props} />
        </PageWrapper>
      ),
      ...restOfProps,
    };
  },
);
const firstPath = routes[0].path as string;

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
    flex-direction: column;
    overflow: auto;
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function App(props: Props) {
  // useCssReset();
  const { Root, styles } = useStyles(props);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const unsubscribe = history.listen(() => {
      setTimeout(() => {
        const { Prism } = window as any;
        if (!Prism) return;
        Prism.highlightAll();
      }, 0);
    });

    return unsubscribe;
  }, [history]);

  return (
    <Root>
      <Nav
        className={styles.nav}
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <div className={styles.content}>
        <AppBar
          className={styles.appBar}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
        <main className={styles.main}>
          <Suspense fallback="Loading…">
            <Switch>
              <Route
                path="/"
                exact
                render={() => <Redirect to={firstPath} />}
              />
              {routes.map(({ title, ...restOfRoute }, index) => (
                <Route key={index} {...restOfRoute} />
              ))}
              <Route path="/404" component={NoRoute} />
              <Redirect to="/404" />
            </Switch>
          </Suspense>
        </main>
      </div>
    </Root>
  );
}

export default memo(App);
