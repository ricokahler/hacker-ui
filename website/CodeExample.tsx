import React, { useState, useMemo, useCallback } from 'react';
import { stripIndent } from 'common-tags';
import { transparentize } from 'polished';
import { getParameters } from 'codesandbox/lib/api/define';
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
import CopyToClipBoard from 'react-copy-to-clipboard';
import CodeSandboxIcon from './CodeSandboxIcon';

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
  codeButton: css`
    flex: 0 0 auto;
    margin-left: auto;
  `,
  content: css`
    flex: 1 1 auto;
    padding: ${theme.space(1)};
    background-color: ${transparentize(0.8, theme.colors.bland)};
    display: flex;
    flex-direction: auto;
    overflow: auto;
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
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    & > *:not(:last-child) {
      margin-bottom: ${theme.space(0.5)};
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

  const code = codeType === 'typescript' ? typescriptCode : javascriptCode;

  const handleCopy = () => {
    alert('Code copied to clipboard!');
  };

  const codeSandboxUrl = useMemo(() => {
    const parameters = getParameters({
      files: {
        [`Example.${codeType === 'typescript' ? 'tsx' : 'js'}`]: {
          content: code,
          isBinary: false,
        },
        [`index.${codeType === 'typescript' ? 'tsx' : 'js'}`]: {
          content: stripIndent`
            import React from 'react';
            import { render } from 'react-dom';
            import { ThemeProvider, createTheme, useCssReset } from 'hacker-ui';
            import Example from './Example';
            
            const theme = createTheme();
            
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.bottom = '0';
            container.style.right = '0';
            container.style.width = '100vw';
            container.style.height = '100vh';
            
            document.body.appendChild(container);
            
            function App() {
              useCssReset();
            
              return (
                <ThemeProvider theme={theme}>
                  <Example />
                </ThemeProvider>
              );
            }
            
            render(<App />, container);
          `,
          isBinary: false,
        },
        'package.json': {
          content: JSON.stringify(
            {
              name: 'react',
              version: '1.0.0',
              description: '',
              keywords: [],
              main: `src/index.${codeType === 'typescript' ? 'tsx' : 'js'}`,
              dependencies: {
                'hacker-ui': 'latest',
                react: '16.12.0',
                'react-dom': '16.12.0',
                'react-scripts': '3.0.1',
              },
              devDependencies: {
                '@types/react': '16.9.19',
                '@types/react-dom': '16.9.5',
                typescript: '3.3.3',
              },
              scripts: {
                start: 'react-scripts start',
                build: 'react-scripts build',
                test: 'react-scripts test --env=jsdom',
                eject: 'react-scripts eject',
              },
              browserslist: [
                '>0.2%',
                'not dead',
                'not ie <= 11',
                'not op_mini all',
              ],
            },
            null,
            2,
          ),
          isBinary: false,
        },
        '.prettier.rc': {
          content: JSON.stringify(
            {
              printWidth: 80,
              singleQuote: true,
              trailingComma: 'all',
            },
            null,
            2,
          ),
          isBinary: false,
        },
        ...(codeType === 'typescript'
          ? {
              'tsconfig.json': {
                content: JSON.stringify(
                  {
                    include: ['./src/*'],
                    compilerOptions: {
                      strict: true,
                      lib: ['dom', 'es2015'],
                      jsx: 'react',
                    },
                  },
                  null,
                  2,
                ),
                isBinary: false,
              },
            }
          : null),
      },
    });

    return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
  }, [code, codeType]);

  return (
    <>
      <Root>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          <Tooltip title="Show code">
            {props => (
              <Button
                shape="icon"
                className={styles.codeButton}
                color={theme.colors.bland}
                onClick={() => setCodeExampleOpen(true)}
                {...props}
              >
                <FontAwesomeIcon icon={faCode} />
              </Button>
            )}
          </Tooltip>
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
                  component={props => (
                    // eslint-disable-next-line jsx-a11y/anchor-has-content
                    <a
                      href={codeSandboxUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  )}
                  shape="icon"
                  color="white"
                  on="black"
                  size="large"
                  variant="filled"
                  {...props}
                >
                  <CodeSandboxIcon />
                </Button>
              )}
            </Tooltip>

            <Tooltip title="Copy code">
              {props => (
                <CopyToClipBoard text={code} onCopy={handleCopy}>
                  <Button
                    shape="icon"
                    color="white"
                    on="black"
                    size="large"
                    variant="filled"
                    {...props}
                  >
                    <FontAwesomeIcon icon={faCopy} size="lg" />
                  </Button>
                </CopyToClipBoard>
              )}
            </Tooltip>
          </div>

          <div className={styles.codeContainer}>
            <pre className={styles.code}>{code}</pre>
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
