import React, { useState } from 'react';
import classNames from 'classnames';
import { readableColor, darken, lighten } from 'polished';
import {
  Link,
  MemoryRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import {
  useTheme,
  createStyles,
  PropsFromStyles,
  List,
  ListItem,
  ListItemButton,
} from 'hacker-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// Styles
const useStyles = createStyles(({ css, theme }) => {
  const navBackgroundColor =
    readableColor(theme.colors.surface) === '#000'
      ? darken(0.03, theme.colors.surface)
      : lighten(0.03, theme.colors.surface);

  return {
    root: css`
      display: flex;
      background-color: ${theme.colors.surface};
      box-shadow: ${theme.shadows.standard};
      margin: ${theme.gap(1)};
      height: 500px;
    `,
    title: css`
      ${theme.fonts.body1};
      font-weight: bold;
      flex: 0 0 auto;
      height: ${theme.block(0.5)};
      padding: 0 ${theme.space(1)};
      border-bottom: 1px solid ${theme.colors.bland};
      display: flex;
      align-items: center;
    `,
    list: css`
      margin: 0;
      overflow: auto;
      flex: 1 1 auto;
    `,
    nav: css`
      flex: 0 0 auto;
      width: ${theme.block(2)};
      overflow: hidden;
      background-color: ${navBackgroundColor};
      display: flex;
      flex-direction: column;
    `,
    content: css`
      flex: 1 1 auto;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    `,
    header: css`
      ${theme.fonts.body1};
      font-family: monospace;
      flex: 0 0 auto;
      height: ${theme.block(0.5)};
      padding: 0 ${theme.space(1)};
      border-bottom: 1px solid ${theme.colors.bland};
      display: flex;
      align-items: center;
    `,
    main: css`
      flex: 1 1 auto;
      display: flex;
      & > h1 {
        ${theme.fonts.h2};
        margin: auto;
      }
    `,
    listItemButton: css`
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    `,
    listItemText: css`
      margin-right: ${theme.space(1)};
    `,
    listItemIcon: css`
      margin-left: auto;
    `,
    itemActive: css`
      background-color: ${darken(0.09, navBackgroundColor)};

      &:focus {
        background-color: ${darken(0.07, navBackgroundColor)};
      }
      &:hover {
        background-color: ${darken(0.05, navBackgroundColor)};
      }
      &:active {
        background-color: ${darken(0.03, navBackgroundColor)};
      }
    `,
  };
});

// Mock Pages
const First = () => <h1>First</h1>;
const Second = () => <h1>Second</h1>;
const Third = () => <h1>Third</h1>;
const Profile = () => <h1>Profile</h1>;
const Account = () => <h1>Account</h1>;
const About = () => <h1>About</h1>;
const VeryNested = () => <h1>Very Nested</h1>;

/**
 * represents recursive data to define a nested list
 */
type Links = Array<{
  title: string;
  value: Links | React.ComponentType<any>;
}>;

/**
 * this defines the navigation structure
 */
const links: Links = [
  {
    title: 'Introduction',
    value: [
      { title: 'First', value: First },
      { title: 'Second', value: Second },
      { title: 'Third', value: Third },
    ],
  },
  {
    title: 'Home',
    value: [
      { title: 'Profile', value: Profile },
      { title: 'Account', value: Account },
      {
        title: 'Folder',
        value: [
          {
            title: 'Very Nested',
            value: VeryNested,
          },
        ],
      },
    ],
  },
  { title: 'About', value: About },
];

function titleToSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-');
}

/**
 * the links defined above are flattened into "pages" that are passed to
 * `react-router` routes
 */
interface Page {
  title: string;
  path: string;
  component: React.ComponentType<any>;
}

function flattenLinks(links: Links, parentTitle: string = ''): Page[] {
  return links
    .map(({ title, value }) => {
      const path = `${parentTitle}/${titleToSlug(title)}`;
      if (Array.isArray(value)) {
        return flattenLinks(value, path);
      }

      return [{ title, path, component: value }];
    })
    .reduce((flattened, next) => {
      for (const item of next) {
        flattened.push(item);
      }
      return flattened;
    }, [] as Page[]);
}

const pages = flattenLinks(links);
const [firstPage] = pages;

// Set operations where the `set` is a javascript object
const toggle = (set: { [key: string]: boolean }, keyToToggle: string) =>
  set[keyToToggle] ? remove(set, keyToToggle) : add(set, keyToToggle);

const remove = (set: { [key: string]: boolean }, keyToRemove: string) =>
  Object.keys(set)
    .filter(key => key !== keyToRemove)
    .reduce((set, key) => {
      set[key] = true;
      return set;
    }, {} as { [key: string]: boolean });

const add = (set: { [key: string]: boolean }, keyToAdd: string) => ({
  ...set,
  [keyToAdd]: true,
});

interface Props extends PropsFromStyles<typeof useStyles> {}

function NavExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState({} as { [key: string]: boolean });
  const location = useLocation();

  /**
   * recursively creates
   */
  const makeList = (
    links: Links,
    parentTitle: string = '',
    depth: number = 0,
  ): React.ReactElement => (
    <List className={classNames({ [styles.list]: depth === 0 })}>
      {links.map(({ title, value }) => {
        const path = `${parentTitle}/${titleToSlug(title)}`;
        const isFolder = Array.isArray(value);
        const isCollapsed = collapsed[path];

        const handleClick = () => {
          if (!isFolder) return;
          setCollapsed(collapsed => toggle(collapsed, path));
        };

        return (
          <>
            <ListItem>
              <ListItemButton
                className={classNames(styles.listItemButton, {
                  [styles.itemActive]: location.pathname === path,
                })}
                style={{ paddingLeft: theme.space(depth + 1) }}
                onClick={handleClick}
                component={
                  isFolder ? 'button' : props => <Link to={path} {...props} />
                }
              >
                <span className={styles.listItemText}>{title}</span>{' '}
                {isFolder && (
                  <FontAwesomeIcon
                    className={styles.listItemIcon}
                    icon={faCaretDown}
                    rotation={isCollapsed ? 90 : undefined}
                  />
                )}
              </ListItemButton>
            </ListItem>
            {Array.isArray(value) &&
              !isCollapsed &&
              makeList(value, path, depth + 1)}
          </>
        );
      })}
    </List>
  );

  return (
    <Root>
      <nav className={styles.nav}>
        <div className={styles.title}>Nav Example</div>
        {makeList(links)}
      </nav>
      <div className={styles.content}>
        <header className={styles.header}>{location.pathname}</header>
        <main className={styles.main}>
          <Switch>
            {pages.map(({ path, component }) => (
              <Route path={path} exact component={component} />
            ))}
            <Redirect to={firstPage.path} />
          </Switch>
        </main>
      </div>
    </Root>
  );
}

export default () => (
  // in a real app, you would wrap your whole app in a browser router.
  // this memory router is just for this example
  <MemoryRouter>
    <NavExample />
  </MemoryRouter>
);
