import React, { useState } from 'react';
import {
  createStyles,
  PropsFromStyles,
  FormControl,
  Label,
  Checkbox,
  TextArea,
  HelperText,
} from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;

    ${theme.breakpoints.down(theme.breakpoints.tablet)} {
      flex-direction: column;
    }
  `,
  controls: css`
    flex: 0 0 auto;
    overflow: hidden;
    width: ${theme.block(2)};
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  title: css`
    ${theme.fonts.h5};
  `,
  content: css`
    flex: 1 1 auto;
    overflow: hidden;
    display: flex;
  `,
  checkboxFormControl: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
  textInputFormControl: css`
    margin: ${theme.gap(1)} auto;
    width: ${theme.block(4)};
  `,
  textArea: css`
    resize: vertical;
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function FormControlPlaygroundExample(props: Props) {
  const { Root, styles } = useStyles(props);

  const [message, setMessage] = useState('');
  const [hasError, setHasError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <Root>
      <div className={styles.controls}>
        <h3 className={styles.title}>Form Control Options</h3>
        <FormControl className={styles.checkboxFormControl}>
          <Checkbox
            checked={disabled}
            onChange={() => setDisabled(!disabled)}
          />
          <Label>Disabled</Label>
        </FormControl>

        <FormControl className={styles.checkboxFormControl}>
          <Checkbox
            checked={hasError}
            onChange={() => setHasError(!hasError)}
          />
          <Label>Has Error</Label>
        </FormControl>
      </div>
      <div className={styles.content}>
        <FormControl
          className={styles.textInputFormControl}
          hasError={hasError}
          disabled={disabled}
        >
          <Label>Gift Message</Label>
          <TextArea
            className={styles.textArea}
            value={message}
            onChange={e => setMessage(e.currentTarget.value)}
            placeholder="Make the message short and sweet."
            rows={5}
          />
          <HelperText>
            {hasError ? (
              <>Message too long</>
            ) : (
              <>
                {message.length} Character{message.length === 1 ? '' : 's'}
              </>
            )}
          </HelperText>
        </FormControl>
      </div>
    </Root>
  );
}

export default FormControlPlaygroundExample;
