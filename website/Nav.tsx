import React, { useState, Fragment } from 'react';
import classNames from 'classnames';
import { darken, lighten, readableColor } from 'polished';
import {
  createStyles,
  StyleProps,
  List,
  ListItemButton,
  useTheme,
} from 'hacker-ui';
import { Link, useLocation } from 'react-router-dom';
import docArray, { DocArray } from '../docs';
import { toggle } from './setOperations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const useStyles = createStyles(({ css, theme }) => {
  const backgroundColor =
    readableColor(theme.colors.surface) === '#000'
      ? darken(0.03, theme.colors.surface)
      : lighten(0.03, theme.colors.surface);

  return {
    root: css`
      width: ${theme.block(3)};
      background-color: ${backgroundColor};
      color: ${readableColor(backgroundColor)};
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
      ${theme.fonts.h5};
    `,
    version: css`
      ${theme.fonts.caption};
    `,
    body: css`
      flex: 1 1 auto;
      overflow: auto;
    `,
    item: css`
      display: flex;
      flex-direction: row;
      justify-content: stretch;
    `,
    icon: css`
      margin-left: auto;
    `,
    itemTitle: css`
      ${theme.fonts.body1};
      margin-right: ${theme.space(1)};
    `,
    itemTitleBold: css`
      font-weight: bold;
    `,
    routeBody: css`
      ${theme.fonts.caption};
    `,
    itemActive: css`
      background-color: ${darken(0.09, backgroundColor)};

      &:focus {
        background-color: ${darken(0.07, backgroundColor)};
      }
      &:hover {
        background-color: ${darken(0.05, backgroundColor)};
      }
      &:active {
        background-color: ${darken(0.03, backgroundColor)};
      }
    `,
  };
});

interface Props extends StyleProps<typeof useStyles> {}

function Nav(props: Props) {
  const { Root, styles } = useStyles(props, 'aside');
  const location = useLocation();
  const theme = useTheme();
  const [collapsedSet, setCollapsedSet] = useState<{ [key: string]: boolean }>(
    {},
  );

  const makeList = (
    docArray: DocArray,
    rootPath = '',
    depth = 0,
  ): React.ReactNode => {
    return (
      <Fragment key={`root-${rootPath}`}>
        {docArray.map(({ title, value }) => {
          const slug = title.toLowerCase().replace(/ /g, '-');
          const path = `${rootPath}/${slug}`;
          const isDirectory = Array.isArray(value);
          const isCollapsed = collapsedSet[path];
          const active = location.pathname === path;

          const handleClick = (path: string) => {
            if (!isDirectory) return;
            setCollapsedSet(set => toggle(set, path));
          };

          return (
            <li key={`sub-${path}`}>
              <ListItemButton
                className={classNames(styles.item, {
                  [styles.itemActive]: active,
                })}
                style={{ paddingLeft: theme.space(depth + 1) }}
                component={
                  isDirectory
                    ? 'button'
                    : (props: any) => <Link to={path} {...props} />
                }
                onClick={() => handleClick(path)}
              >
                <div
                  className={classNames(styles.itemTitle, {
                    [styles.itemTitleBold]: isDirectory,
                  })}
                >
                  {title}
                </div>
                {isDirectory && (
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faCaretDown}
                    rotation={isCollapsed ? 90 : undefined}
                  />
                )}
              </ListItemButton>

              {!isCollapsed && Array.isArray(value) && (
                <List>{makeList(value, path, depth + 1)}</List>
              )}
            </li>
          );
        })}
      </Fragment>
    );
  };

  return (
    <Root>
      <div className={styles.header}>
        <h1 className={styles.title}>Hacker UI</h1>
        <span className={styles.version}>v0.0.0</span>
      </div>
      <nav className={styles.body}>
        <List>{makeList(docArray)}</List>
      </nav>
    </Root>
  );
}

export default Nav;
