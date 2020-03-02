import React, { useState, Fragment } from 'react';
import classNames from 'classnames';
import { darken, lighten, readableColor } from 'polished';
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
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import docArray, { DocArray } from '../docs';
// @ts-ignore
import { version } from '../package.json';
import { toggle } from './setOperations';

function flattenDocArray(arr: DocArray): DocArray {
  return arr
    .map(i => (Array.isArray(i.value) ? flattenDocArray(i.value) : [i]))
    .reduce((flattened, next) => {
      for (const i of next) {
        flattened.push(i);
      }
      return flattened;
    }, [] as DocArray);
}

const flattenedDocArray = docArray.map(i =>
  Array.isArray(i.value)
    ? { title: i.title, value: flattenDocArray(i.value) }
    : i,
) as DocArray;

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
      height: 100%;
    `,
    header: css`
      flex: 0 0 auto;
      padding: ${theme.space(1)};
      border-bottom: 1px solid ${theme.colors.bland};
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

  const isMobile = useMediaQuery(
    theme.breakpoints.down(theme.breakpoints.tablet),
  );

  const content = (
    <Root>
      <div className={styles.header}>
        {isMobile && (
          <Tooltip title="Close Nav" position="right">
            {tooltipProps => (
              <Button
                {...tooltipProps}
                className={styles.closeButton}
                shape="icon"
                color={theme.colors.brand}
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
          <h1 className={styles.title}>
            <span>Hacker UI</span>
          </h1>
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
                    className={styles.item}
                    onClick={() =>
                      setCollapsedSet(set => toggle(set, rootSlug))
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
                            className={styles.item}
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
    <Drawer open={open} onClose={onClose}>
      {content}
    </Drawer>
  );
}

export default Nav;
