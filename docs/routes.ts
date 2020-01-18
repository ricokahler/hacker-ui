import { RouteProps } from 'react-router-dom';

import NoRoute from './NoRoute';
import Buttons from './Buttons';
import Welcome from './Welcome';

const routes: Array<RouteProps & { title: string }> = [
  { title: 'Welcome', path: '/', exact: true, component: Welcome },
  { title: '404', path: '/404', component: NoRoute },
  { title: 'Buttons', path: '/buttons', component: Buttons },
  { title: 'Lists ', path: '/list', component: () => null },
];

export default routes;
