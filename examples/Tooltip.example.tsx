import React, { useState } from 'react';
import { FormControl, Label, Select, Button, Tooltip, Emoji } from 'hacker-ui';
import { createStyles, PropsFromStyles } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
  `,
  controls: css`
    flex: 0 0 auto;
    width: ${theme.block(2)};
  `,
  content: css`
    flex: 1 1 auto;
    display: flex;
  `,
  button: css`
    box-shadow: ${theme.shadows.standard};
    margin: ${theme.gap(1)} auto;
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function TooltipExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>(
    'top',
  );

  return (
    <Root>
      <div className={styles.controls}>
        <FormControl>
          <Label>Position</Label>
          <Select
            value={position}
            onChange={e =>
              setPosition(
                e.currentTarget.value as 'top' | 'bottom' | 'left' | 'right',
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
        <Tooltip
          title={
            <>
              Tooltip{' '}
              <Emoji label="Hooray!">
                {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                🎉
              </Emoji>
            </>
          }
          position={position}
        >
          {props => (
            <Button className={styles.button} variant="filled" {...props}>
              Hover Here
            </Button>
          )}
        </Tooltip>
      </div>
    </Root>
  );
}

export default TooltipExample;
