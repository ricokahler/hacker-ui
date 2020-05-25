import React from 'react';
import { List, ListItem, ListItemButton } from 'hacker-ui';
import { createStyles, PropsFromStyles } from 'react-style-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const useStyles = createStyles(({ css, theme }) => ({
  root: css``,
  list: css`
    width: ${theme.block(3)};
    background-color: ${theme.surface};
    margin: ${theme.gap(1)} auto;
    box-shadow: ${theme.shadows.standard};
  `,
  listItemButton: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    text-align: left;
  `,
  info: css`
    flex: 1 1 auto;
  `,
  title: css`
    ${theme.h6}
  `,
  subtitle: css`
    ${theme.caption}
  `,
  icon: css`
    flex: 0 0 auto;
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function ListWithSubtitlesExample(props: Props) {
  const { Root, styles } = useStyles(props);

  return (
    <Root>
      <List className={styles.list}>
        <ListItem>
          <ListItemButton className={styles.listItemButton}>
            <div className={styles.info}>
              <div className={styles.title}>Apples</div>
              <div className={styles.subtitle}>
                Updated at {new Date().toLocaleTimeString()}
              </div>
            </div>
            <FontAwesomeIcon className={styles.icon} icon={faChevronRight} />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton className={styles.listItemButton}>
            <div className={styles.info}>
              <div className={styles.title}>Bananas</div>
              <div className={styles.subtitle}>
                Updated at {new Date().toLocaleTimeString()}
              </div>
            </div>
            <FontAwesomeIcon className={styles.icon} icon={faChevronRight} />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton className={styles.listItemButton}>
            <div className={styles.info}>
              <div className={styles.title}>Oranges</div>
              <div className={styles.subtitle}>
                Updated at {new Date().toLocaleTimeString()}
              </div>
            </div>
            <FontAwesomeIcon className={styles.icon} icon={faChevronRight} />
          </ListItemButton>
        </ListItem>
      </List>
    </Root>
  );
}

export default ListWithSubtitlesExample;
