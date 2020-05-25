import React, { useState } from 'react';
import { Select, FormControl, Label, Button, CheckIcon } from 'hacker-ui';
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;

    ${theme.media.down('tablet')} {
      flex-direction: column;
    }
  `,
  controls: css`
    flex: 0 0 auto;
    width: ${theme.block(2)};
    overflow: hidden;
    margin-right: ${theme.gap(1)};
    display: flex;
    flex-direction: column;

    & > *:not(:last-child) {
      margin-bottom: ${theme.space(0.5)};

      ${theme.media.down('tablet')} {
        margin-right: ${theme.space(0.5)};
      }
    }

    ${theme.media.down('tablet')} {
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
    }
  `,
  formControl: css`
    min-width: ${theme.block(1.5)};
  `,
  buttons: css`
    display: flex;
    flex: 0 1 auto;
    overflow: hidden;
    align-items: center;
    margin: auto;
    flex-wrap: wrap;
    padding-top: ${theme.space(1)};

    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }

    & > * {
      margin-bottom: ${theme.space(1)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function ButtonsExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();
  const [variant, setVariant] = useState<'filled' | 'outlined' | 'ghost'>(
    'filled',
  );
  const [size, setSize] = useState<'small' | 'standard' | 'large'>('standard');
  const [disabled, setDisabled] = useState(false);
  const [shape, setShape] = useState<'standard' | 'icon'>('standard');

  return (
    <Root>
      <div className={styles.controls}>
        <FormControl className={styles.formControl}>
          <Label>Variant</Label>
          <Select
            value={variant}
            onChange={(e) => {
              setVariant(
                e.currentTarget.value as 'filled' | 'outlined' | 'ghost',
              );
            }}
          >
            <option value="filled">Filled</option>
            <option value="outlined">Outlined</option>
            <option value="ghost">Ghost</option>
          </Select>
        </FormControl>

        <FormControl className={styles.formControl}>
          <Label>Size</Label>
          <Select
            value={size}
            onChange={(e) => {
              setSize(e.currentTarget.value as 'small' | 'standard' | 'large');
            }}
          >
            <option value="small">Small</option>
            <option value="standard">Standard</option>
            <option value="large">Large</option>
          </Select>
        </FormControl>

        <FormControl className={styles.formControl}>
          <Label>Shape</Label>
          <Select
            value={shape}
            onChange={(e) => {
              setShape(e.currentTarget.value as 'icon' | 'standard');
            }}
          >
            <option value="standard">Standard</option>
            <option value="icon">Icon</option>
          </Select>
        </FormControl>

        <FormControl className={styles.formControl}>
          <Label>Disabled</Label>
          <Select
            value={disabled ? 'yes' : 'no'}
            onChange={(e) => {
              setDisabled(e.currentTarget.value === 'yes');
            }}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </Select>
        </FormControl>
      </div>

      <div className={styles.buttons}>
        <Button
          variant={variant}
          size={size}
          color={theme.brand}
          shape={shape}
          disabled={disabled}
        >
          {shape === 'icon' ? <CheckIcon /> : 'Brand'}
        </Button>
        <Button
          variant={variant}
          size={size}
          color={theme.accent}
          shape={shape}
          disabled={disabled}
        >
          {shape === 'icon' ? <CheckIcon /> : 'Accent'}
        </Button>
        <Button
          variant={variant}
          size={size}
          color={theme.bland}
          shape={shape}
          disabled={disabled}
        >
          {shape === 'icon' ? <CheckIcon /> : 'Bland'}
        </Button>
        <Button
          variant={variant}
          size={size}
          color={theme.danger}
          shape={shape}
          disabled={disabled}
        >
          {shape === 'icon' ? <CheckIcon /> : 'Danger'}
        </Button>
      </div>
    </Root>
  );
}

export default ButtonsExample;
