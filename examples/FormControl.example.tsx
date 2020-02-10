import React from 'react';
import {
  createStyles,
  PropsFromStyles,
  FormControl,
  Label,
  TextInput,
  HelperText,
} from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css``,
  formControl: css`
    width: ${theme.block(3)};
    margin: ${theme.gap(1)} auto;
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function FormControlExample(props: Props) {
  const { Root, styles } = useStyles(props);

  return (
    <Root>
      <FormControl className={styles.formControl}>
        <Label>Click this label</Label>
        <TextInput placeholder="This example will focus" />
        <HelperText>This helper text will follow.</HelperText>
      </FormControl>
    </Root>
  );
}

export default FormControlExample;
