import React, { useState, Fragment } from 'react';
import classNames from 'classnames';
import {
  List,
  ListItemButton,
  useMediaQuery,
  Drawer,
  Button,
  TimesIcon,
  ListItem,
  Tooltip,
} from 'hacker-ui';
import {
  createStyles,
  PropsFromStyles,
  useTheme,
  darken,
  lighten,
  readableColor,
} from 'react-style-system';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import docArray, { DocArray } from '../docs';
// @ts-ignore
import { version } from '../package.json';
import { toggle } from './setOperations';

function flattenDocArray(arr: DocArray): DocArray {
  return arr
    .map((i) => (Array.isArray(i.value) ? flattenDocArray(i.value) : [i]))
    .reduce((flattened, next) => {
      for (const i of next) {
        flattened.push(i);
      }
      return flattened;
    }, [] as DocArray);
}

const flattenedDocArray = docArray.map((i) =>
  Array.isArray(i.value)
    ? { title: i.title, value: flattenDocArray(i.value) }
    : i,
) as DocArray;

const useStyles = createStyles(({ css, theme, surface }) => {
  const backgroundColor =
    readableColor(theme.surface) === '#000'
      ? darken(theme.surface, 0.03)
      : lighten(theme.surface, 0.03);

  return {
    root: css`
      width: ${theme.block(2.5)};
      background-color: ${backgroundColor};
      color: ${readableColor(backgroundColor)};
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
    `,
    drawer: css`
      width: ${theme.block(2.5)};
    `,
    header: css`
      flex: 0 0 auto;
      padding: ${theme.space(1)};
      border-bottom: 1px solid ${theme.bland};
      min-height: ${theme.block(0.75)};
      display: flex;
    `,
    closeButton: css`
      margin-right: ${theme.space(1)};
    `,
    headerInfo: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `,
    title: css`
      ${theme.h6};
      color: ${readableColor(surface)};

      &:hover {
        text-decoration: underline;
      }
    `,
    version: css`
      ${theme.caption};
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
      font-weight: 400;
      margin-right: ${theme.space(1)};
    `,
    itemTitleBold: css`
      font-weight: bold;
    `,
    routeBody: css`
      ${theme.caption};
    `,
    headerItem: css`
      margin-top: ${theme.space(1)};
    `,
    nestedItem: css`
      padding-left: ${theme.space(1.5)};
    `,
  };
});

interface Props extends PropsFromStyles<typeof useStyles> {
  open: boolean;
  onClose: () => void;
}

function Nav(props: Props) {
  const { Root, styles, open, onClose } = useStyles(props, 'aside');
  const theme = useTheme();
  const [collapsedSet, setCollapsedSet] = useState<{ [key: string]: boolean }>(
    {},
  );

  const isMobile = useMediaQuery(theme.media.down('tablet'));

  const content = (
    <Root>
      <div className={styles.header}>
        {isMobile && (
          <Tooltip title="Close Nav" position="right">
            {(tooltipProps) => (
              <Button
                {...tooltipProps}
                className={styles.closeButton}
                shape="icon"
                color={theme.brand}
                aria-label="Close Nav"
                onClick={onClose}
                autoFocus
              >
                <TimesIcon />
              </Button>
            )}
          </Tooltip>
        )}
        <div className={styles.headerInfo}>
          <Link to="/">
            <h1 className={styles.title}>Hacker UI</h1>
          </Link>
          <span className={styles.version}>{version}</span>
        </div>
      </div>
      <nav className={styles.body}>
        <List>
          {flattenedDocArray.map(({ title, value }) => {
            const rootSlug = `/${title.toLowerCase().replace(/ /g, '-')}`;

            if (!Array.isArray(value)) {
              throw new Error('Document must be in a folder');
            }

            return (
              <Fragment key={rootSlug}>
                <ListItem>
                  <ListItemButton
                    className={classNames(styles.item, styles.headerItem)}
                    onClick={() =>
                      setCollapsedSet((set) => toggle(set, rootSlug))
                    }
                  >
                    <div
                      className={classNames(
                        styles.itemTitle,
                        styles.itemTitleBold,
                      )}
                    >
                      {title}
                    </div>
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faCaretDown}
                      rotation={collapsedSet[rootSlug] ? 90 : undefined}
                    />
                  </ListItemButton>
                </ListItem>

                {!collapsedSet[rootSlug] && (
                  <List>
                    {value.map(({ title }) => {
                      const slug = title.toLowerCase().replace(/ /g, '-');
                      const path = `${rootSlug}/${slug}`;

                      return (
                        <ListItem key={slug}>
                          <ListItemButton
                            className={classNames(
                              styles.item,
                              styles.nestedItem,
                            )}
                            component={Link}
                            // @ts-ignore
                            to={path}
                            onClick={onClose}
                          >
                            <div className={styles.itemTitle}>{title}</div>
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Fragment>
            );
          })}
        </List>
      </nav>
    </Root>
  );

  if (!isMobile) return content;

  return (
    <Drawer className={styles.drawer} open={open} onClose={onClose}>
      {content}
    </Drawer>
  );
}

export default Nav;
