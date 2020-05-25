import React, { useState, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStyles, PropsFromStyles } from 'react-style-system';
import docArray from '../docs';
import flattenDocArray from './flattenDocArray';

import Nav from './Nav';
import AppBar from './AppBar';
import NoRoute from './NoRoute';
import PageWrapper from './PageWrapper';
import LoadingView from './LoadingView';

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
    background-color: ${theme.surface};
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

function Docs(props: Props) {
  const { Root, styles } = useStyles(props);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
          <Suspense fallback={<LoadingView />}>
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

export default Docs;
