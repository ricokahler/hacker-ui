import { RouteProps } from 'react-router-dom';

import NoRoute from './NoRoute';
import Buttons from './Buttons';
import Welcome from './Welcome';
import Links from './Links';
import FormElements from './FormElements';

const routes: Array<RouteProps & { title: string }> = [
  { title: 'Welcome', path: '/', exact: true, component: Welcome },
  { title: '404', path: '/404', component: NoRoute },
  { title: 'Buttons', path: '/buttons', component: Buttons },
  { title: 'Lists ', path: '/list', component: () => null },
  { title: 'Links', path: '/links', component: Links },
  { title: 'Form elements', path: '/form-elements', component: FormElements },
];

export default routes;
