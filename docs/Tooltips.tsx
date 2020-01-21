import React, { useState } from 'react';
import { createStyles, PropsFromStyles, Tooltip, Select } from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    padding: ${theme.gap(1)};
    & > *:not(:last-child) {
      margin-bottom: ${theme.gap(1)};
    }
  `,
  title: css`
    ${theme.fonts.h3};
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function Chips(props: Props) {
  const { Root, styles } = useStyles(props);
  const [position, setPosition] = useState('top');

  return (
    <Root>
      <h1 className={styles.title}>Tooltips</h1>
      <Tooltip position={position as any} title="help">
        {props => <span {...props}>hover here</span>}
      </Tooltip>

      <Select
        value={position}
        onChange={e => setPosition(e.currentTarget.value)}
      >
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </Select>
    </Root>
  );
}

export default Chips;
