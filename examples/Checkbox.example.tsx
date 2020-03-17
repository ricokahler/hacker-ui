import React from 'react';
import { FormControl, Label, HelperText, Checkbox, Switch } from 'hacker-ui';
import { createStyles, PropsFromStyles } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    margin: ${theme.gap(1)} auto;
    flex-wrap: wrap;
    & > *:not(:last-child) {
      margin-right: ${theme.gap(1)};
      margin-bottom: ${theme.space(1)};
    }
  `,
  row: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function CheckboxExample(props: Props) {
  const { Root, styles } = useStyles(props);

  return (
    <Root>
      <FormControl>
        <div className={styles.row}>
          <Switch size="small" />
          <Label>Enable</Label>
        </div>
        <HelperText>Checkbox then label</HelperText>
      </FormControl>

      <FormControl>
        <div className={styles.row}>
          <Label>Agree</Label>
          <Checkbox />
        </div>
        <HelperText>Label then checkbox</HelperText>
      </FormControl>

      <FormControl className={styles.row}>
        <Checkbox />
        <Label>No helper text</Label>
      </FormControl>
    </Root>
  );
}

export default CheckboxExample;
