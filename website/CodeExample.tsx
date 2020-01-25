import React, { useState } from 'react';
import { transparentize } from 'polished';
import {
  createStyles,
  PropsFromStyles,
  Button,
  Tooltip,
  useTheme,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalActions,
  Radio,
  FormControl,
  RadioGroup,
  Label,
} from 'hacker-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faCopy } from '@fortawesome/free-solid-svg-icons';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    flex-direction: column;
  `,
  titleRow: css`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  `,
  title: css`
    margin-right: ${theme.space(1)};
  `,
  buttons: css`
    margin-left: auto;
    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
  content: css`
    flex: 1 1 auto;
    padding: ${theme.space(1)};
    background-color: ${transparentize(0.8, theme.colors.bland)};
    display: flex;
    flex-direction: auto;
  `,
  modalHeader: css`
    flex-direction: row;
    align-items: center;
  `,
  modalTitle: css`
    ${theme.fonts.h4};
    margin-right: ${theme.space(1)};
    flex: 0 0 auto;
  `,
  modalButtons: css`
    display: flex;
    margin-left: auto;
    & > :not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
  choice: css`
    flex-direction: row;
    align-items: center;
  `,
  radio: css`
    margin-right: ${theme.space(0.5)};
  `,
  codeContainer: css`
    background-color: black;
    overflow: auto;
    width: 100%;
  `,
  code: css`
    color: white;
    padding: ${theme.space(1)};
    margin: 0;
  `,
  floatingButtons: css`
    position: absolute;
    top: ${theme.space(0.5)};
    right: ${theme.space(0.5)};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > *:not(:first-child) {
      margin-left: ${theme.space(0.5)};
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {
  title: React.ReactNode;
  children: React.ReactNode;
  typescriptCode: string;
  javascriptCode: string;
}

function CodeExample(props: Props) {
  const {
    Root,
    styles,
    title,
    children,
    javascriptCode,
    typescriptCode,
  } = useStyles(props, 'section');
  const theme = useTheme();
  const [codeExampleOpen, setCodeExampleOpen] = useState(false);
  const [codeType, setCodeType] = useState<'typescript' | 'javascript'>(
    'typescript',
  );

  return (
    <>
      <Root>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.buttons}>
            <Tooltip title="Open in CodeSandbox">
              {props => (
                <Button shape="icon" color={theme.colors.bland} {...props}>
                  <FontAwesomeIcon icon={faCode} />
                </Button>
              )}
            </Tooltip>

            <Tooltip title="Show code">
              {props => (
                <Button
                  shape="icon"
                  color={theme.colors.bland}
                  onClick={() => setCodeExampleOpen(true)}
                  {...props}
                >
                  <FontAwesomeIcon icon={faCode} />
                </Button>
              )}
            </Tooltip>
          </div>
        </div>

        <div className={styles.content}>{children}</div>
      </Root>

      <Modal open={codeExampleOpen} onClose={() => setCodeExampleOpen(false)}>
        <ModalHeader className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <RadioGroup
            className={styles.modalButtons}
            value={codeType}
            onChange={e => setCodeType(e.currentTarget.value as any)}
          >
            <FormControl className={styles.choice}>
              <Radio className={styles.radio} value="typescript" />
              <Label>TypeScript</Label>
            </FormControl>

            <FormControl className={styles.choice}>
              <Radio className={styles.radio} value="javascript" />
              <Label>JavaScript</Label>
            </FormControl>
          </RadioGroup>
        </ModalHeader>

        <ModalContent>
          <div className={styles.floatingButtons}>
            <Tooltip title="Open in CodeSandbox">
              {props => (
                <Button
                  shape="icon"
                  color="white"
                  on="black"
                  size="large"
                  {...props}
                >
                  <FontAwesomeIcon icon={faCode} size="lg" />
                </Button>
              )}
            </Tooltip>

            <Tooltip title="Copy code">
              {props => (
                <Button
                  shape="icon"
                  color="white"
                  on="black"
                  size="large"
                  {...props}
                >
                  <FontAwesomeIcon icon={faCopy} size="lg" />
                </Button>
              )}
            </Tooltip>
          </div>

          <div className={styles.codeContainer}>
            <pre className={styles.code}>
              {codeType === 'typescript' ? typescriptCode : javascriptCode}
            </pre>
          </div>
        </ModalContent>

        <ModalFooter>
          <ModalActions>
            <Button
              color={theme.colors.bland}
              onClick={() => setCodeExampleOpen(false)}
            >
              Close
            </Button>
          </ModalActions>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CodeExample;
