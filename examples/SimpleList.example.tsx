import React from 'react';
import { List, ListItem, ListItemButton } from 'hacker-ui';
import { createStyles, PropsFromStyles } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    margin: ${theme.gap(1)} auto;
  `,
  list: css`
    box-shadow: ${theme.shadows.standard};
    background-color: ${theme.surface};
    width: ${theme.block(2)};
  `,
  listItem: css`
    padding: ${theme.space(0.75)} ${theme.space(1)};
  `,
  listItemButton: css``,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function SimpleListExample(props: Props) {
  const { Root, styles } = useStyles(props);

  return (
    <Root>
      <List className={styles.list}>
        <ListItem className={styles.listItem}>Inbox</ListItem>
        <ListItem className={styles.listItem}>Drafts</ListItem>
        <ListItem className={styles.listItem}>Settings</ListItem>
        <ListItem className={styles.listItemButton}>
          <ListItemButton onClick={() => alert('No way!')}>
            This one's clickable
          </ListItemButton>
        </ListItem>
      </List>
    </Root>
  );
}

export default SimpleListExample;
