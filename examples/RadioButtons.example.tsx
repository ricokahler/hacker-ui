import React, { useState } from 'react';
import { RadioGroup, FormControl, Label, Radio, HelperText } from 'hacker-ui';
import { createStyles, PropsFromStyles } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    align-items: center;
    ${theme.down(theme.tablet)} {
      flex-direction: column;
    }
  `,
  formControl: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
  radioGroup: css`
    flex: 0 0 auto;
    overflow: hidden;
    width: ${theme.block(2)};
    margin: ${theme.gap(1)} 0;
    ${theme.down(theme.tablet)} {
      margin: ${theme.space(1)} 0;
    }
    margin-right: ${theme.space(1)};
  `,
  pickOne: css`
    ${theme.caption};
  `,
  content: css`
    flex: 1 1 auto;
    overflow: hidden;
    display: flex;
  `,
  contentContainer: css`
    display: flex;
    flex-direction: column;
    margin: ${theme.gap(1)} auto;
    ${theme.down(theme.tablet)} {
      margin: ${theme.space(1)} auto;
    }
    text-align: center;
  `,
  youSelected: css`
    ${theme.body1};
  `,
  option: css`
    ${theme.h3};
    text-transform: capitalize;
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function RadioButtonsExample(props: Props) {
  const { Root, styles } = useStyles(props);

  const [value, setValue] = useState<'one' | 'two' | 'three'>('one');

  return (
    <Root>
      <RadioGroup
        value={value}
        onChange={(e) =>
          setValue(e.currentTarget.value as 'one' | 'two' | 'three')
        }
        className={styles.radioGroup}
      >
        <h3 className={styles.pickOne}>Pick an option:</h3>

        <FormControl className={styles.formControl}>
          <Radio value="one" />
          <Label>
            <div>Option 1</div>
            <HelperText>This is the first option</HelperText>
          </Label>
        </FormControl>

        <FormControl className={styles.formControl}>
          <Radio value="two" />
          <Label>
            <div>Option 2</div>
            <HelperText>This is the second option</HelperText>
          </Label>
        </FormControl>

        <FormControl className={styles.formControl}>
          <Radio value="three" />
          <Label>
            <div>Option 3</div>
            <HelperText>This is the third option</HelperText>
          </Label>
        </FormControl>
      </RadioGroup>

      <div className={styles.content}>
        <div className={styles.contentContainer}>
          <h3 className={styles.youSelected}>You've selected option:</h3>
          <p className={styles.option}>{value}</p>
        </div>
      </div>
    </Root>
  );
}

export default RadioButtonsExample;
