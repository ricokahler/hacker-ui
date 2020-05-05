import React, { useState } from 'react';
import {
  Menu,
  Button,
  Label,
  Select,
  FormControl,
  List,
  ListItem,
  ListItemButton,
} from 'hacker-ui';
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    min-height: ${theme.block(3)};

    ${theme.breakpoints.down(theme.breakpoints.tablet)} {
      flex-direction: column;
    }
  `,
  controls: css`
    flex: 0 0 auto;
    width: ${theme.block(2)};
    margin-right: ${theme.gap(1)};
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  content: css`
    flex: 1 1 auto;
    display: flex;
  `,
  buttons: css`
    margin: auto;
    display: flex;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
  button: css``,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function MenuExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState<'top' | 'left' | 'bottom' | 'right'>(
    'bottom',
  );

  return (
    <>
      <Root>
        <div className={styles.controls}>
          <FormControl>
            <Label>Position</Label>
            <Select
              value={position}
              onChange={(e) =>
                setPosition(
                  e.currentTarget.value as 'top' | 'left' | 'bottom' | 'right',
                )
              }
            >
              <option value="top">Top</option>
              <option value="left">Left</option>
              <option value="bottom">Bottom</option>
              <option value="right">Right</option>
            </Select>
          </FormControl>
        </div>
        <div className={styles.content}>
          <div className={styles.buttons}>
            <Button
              className={styles.button}
              variant="filled"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              Open Menu
            </Button>
            <Button
              shape="icon"
              color={theme.colors.brand}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </Button>
          </div>
        </div>
      </Root>

      {/* NOTE: the Menu component is explicitly outside of the Root component
      because Menu components aren't part of the subtree the Root component
      creates. */}
      <Menu
        position={position}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <List>
          <ListItem>
            <ListItemButton onClick={() => setAnchorEl(null)}>
              Keep
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setAnchorEl(null)}>
              Delete
            </ListItemButton>
          </ListItem>
        </List>
      </Menu>
    </>
  );
}

export default MenuExample;
