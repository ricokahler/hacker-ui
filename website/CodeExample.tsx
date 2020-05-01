import React, { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { stripIndent } from 'common-tags';
import { transparentize } from 'polished';
import { getParameters } from 'codesandbox/lib/api/define';
import {
  Button,
  Tooltip,
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
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faCopy } from '@fortawesome/free-solid-svg-icons';
import CopyToClipBoard from 'react-copy-to-clipboard';
import CodeSandboxIcon from './CodeSandboxIcon';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${theme.gap(1)};
    padding: ${theme.space(1)};
    background-color: ${transparentize(0.8, theme.colors.bland)};
    display: flex;
    flex-direction: column;
    overflow: auto;
    position: relative;
  `,
  codeButton: css`
    position: absolute;
    top: ${theme.space(0.5)};
    right: ${theme.space(0.5)};
  `,
  modalHeader: css`
    flex-direction: row;
    align-items: center;
    padding: 0 ${theme.space(1)};
  `,
  modalTitle: css`
    ${theme.fonts.h4};
    margin-right: ${theme.space(1)};
    flex: 0 0 auto;
  `,
  modalButtons: css`
    display: flex;
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

    ${theme.breakpoints.down(theme.breakpoints.tablet)} {
      /* TODO: try to remove this important */
      font-size: 0.8rem !important;
    }
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
  children: React.ReactNode;
  typescriptCodePromise: Promise<any>;
  javascriptCodePromise: Promise<any>;
}

function CodeExample(props: Props) {
  const {
    Root,
    styles,
    children,
    javascriptCodePromise,
    typescriptCodePromise,
  } = useStyles(props, 'section');
  const theme = useTheme();
  const [codeExampleOpen, setCodeExampleOpen] = useState(false);
  const [codeType, setCodeType] = useState<'typescript' | 'javascript'>(
    'typescript',
  );

  const [typescriptCode, setTypescriptCode] = useState('Loading…');
  const [javascriptCode, setJavascriptCode] = useState('Loading…');

  const code = codeType === 'typescript' ? typescriptCode : javascriptCode;

  useEffect(() => {
    javascriptCodePromise.then((mod: any) => setJavascriptCode(mod.default));
  }, [javascriptCodePromise]);

  useEffect(() => {
    typescriptCodePromise.then((mod: any) => setTypescriptCode(mod.default));
  }, [typescriptCodePromise]);

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
            import { ThemeProvider } from 'hacker-ui';
            import Example from './Example';
            import theme from './theme';
            import 'normalize.css';
            import './index.css';
            
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.bottom = '0';
            container.style.right = '0';
            container.style.width = '100vw';
            container.style.height = '100vh';
            container.style.padding = '16px';
            
            document.body.appendChild(container);
            
            function App() {
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
        [`theme.${codeType === 'typescript' ? 'tsx' : 'js'}`]: {
          content: stripIndent`
            import { createTheme } from 'hacker-ui';

            const theme = createTheme({
              /* add your overrides here */
            });

            ${
              codeType === 'typescript'
                ? 'export type Theme = typeof theme;'
                : ''
            }
            
            export default theme;
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
                'hacker-ui': '0.0.0-88cd8a409',
                react: '16.12.0',
                'react-dom': '16.12.0',
                'react-scripts': '3.0.1',
                '@fortawesome/fontawesome-svg-core': '^1.2.26',
                '@fortawesome/free-brands-svg-icons': '^5.12.1',
                '@fortawesome/free-solid-svg-icons': '^5.12.0',
                '@fortawesome/react-fontawesome': '^0.1.8',
                'normalize.css': '^8.0.1',
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
        'index.css': {
          content: stripIndent`
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
                Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            }
            
            :root {
              font-size: 16px;
            }
            
            * {
              box-sizing: border-box;
            }
          `,
          isBinary: false,
        },
        'augments.d.ts': {
          content: stripIndent`
            import {
              StyleFnArgs,
              ReactComponent,
              StyleProps,
              GetComponentProps,
            } from 'react-style-system';
            
            declare module 'react-style-system' {
              type Theme = typeof import('./theme').default;

              // provides an override type that includes the type for your theme
              export function useTheme(): Theme;
            
              // provides an override type that includes the type for your theme
              export function createStyles<Styles, ComponentType extends ReactComponent>(
                stylesFn: (args: StyleFnArgs<Theme>) => Styles,
              ): <Props extends StyleProps<Styles>>(
                props: Props,
                component?: ComponentType,
              ) => {
                Root: React.ComponentType<GetComponentProps<ComponentType>>;
                styles: { [P in keyof Styles]: string } & {
                  cssVariableObject: { [key: string]: string };
                };
              } & Omit<Props, keyof StyleProps<any>>;
            }
          `,
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

  useEffect(() => {
    if (!codeExampleOpen) return;

    setTimeout(() => {
      const { Prism } = window as any;
      if (!Prism) return;
      Prism.highlightAll();
    }, 250);
  }, [codeExampleOpen, codeType]);

  return (
    <>
      <Root>
        <Tooltip title="Show code">
          {(props) => (
            <Button
              aria-label="Show code"
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
        {children}
      </Root>

      <Modal
        style={styles.cssVariableObject}
        open={codeExampleOpen}
        onClose={() => setCodeExampleOpen(false)}
      >
        <ModalHeader className={styles.modalHeader}>
          <RadioGroup
            className={styles.modalButtons}
            value={codeType}
            onChange={(e) => setCodeType(e.currentTarget.value as any)}
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
              {(props) => (
                <Button
                  component="a"
                  // the props API for `Button` and `a` don't match so we
                  // use `@ts-ignore` to get around it for this issue
                  // @ts-ignore
                  href={codeSandboxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  shape="icon"
                  color="white"
                  surface="black"
                  size="large"
                  variant="filled"
                  {...props}
                >
                  <CodeSandboxIcon />
                </Button>
              )}
            </Tooltip>

            <Tooltip title="Copy code">
              {(props) => (
                <CopyToClipBoard text={code} onCopy={handleCopy}>
                  <Button
                    shape="icon"
                    color="white"
                    surface="black"
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
            <pre
              className={classNames(styles.code, {
                'language-tsx': codeType === 'typescript',
                'language-jsx': codeType === 'javascript',
              })}
            >
              <code>{code}</code>
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
