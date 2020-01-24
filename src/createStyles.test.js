import React, { useEffect, useState } from 'react';
import { act, create } from 'react-test-renderer';
import delay from 'delay';
import DeferredPromise from './DeferredPromise';
import ThemeProvider from './ThemeProvider';
import createTheme from './createTheme';
import createStyles from './createStyles';

const theme = createTheme();
let mockIndex = 0;
jest.mock('shortid', () => () => {
  const mockId = `id-${mockIndex}`;
  mockIndex += 1;
  return mockId;
});

it('returns colors, styles, and the root component', async () => {
  const stylesHandler = jest.fn();
  const createStylesHandler = jest.fn();
  const rootHandler = jest.fn();
  const done = new DeferredPromise();

  const useStyles = createStyles(({ color, theme, css }) => {
    createStylesHandler({ color, theme, css });

    return {
      root: 'root',
      title: 'title',
    };
  });

  function Component(props) {
    const { Root, styles } = useStyles(props);

    useEffect(() => {
      stylesHandler(styles);
      rootHandler(Root);
      done.resolve();
    }, [Root, styles]);

    return <Root>blah</Root>;
  }

  await act(async () => {
    create(
      <ThemeProvider theme={theme}>
        <Component />
      </ThemeProvider>,
    );
    await done;
  });

  const styles = stylesHandler.mock.calls[0][0];
  const createStylesValues = createStylesHandler.mock.calls[0][0];
  const Root = rootHandler.mock.calls[0][0];

  expect(styles).toMatchInlineSnapshot(`
    Object {
      "root": "hui_root_id-0_id-1",
      "title": "hui_title_id-0_id-1",
    }
  `);
  expect(createStylesValues).toMatchInlineSnapshot(`
    Object {
      "color": Object {
        "asBackground": "#2962ff",
        "bgContrast": "#fff",
        "onSurface": "#2962ff",
      },
      "css": [Function],
      "theme": Object {
        "block": [Function],
        "colors": Object {
          "accent": "#2962ff",
          "bland": "#ccc",
          "brand": "#000",
          "danger": "#eb002b",
          "info": "#2962ff",
          "surface": "#fff",
          "warning": "#f56200",
        },
        "durations": Object {
          "long": 500,
          "short": 100,
          "standard": 250,
        },
        "fonts": Object {
          "body1": "
          font-weight: 400;
          text-transform: none;
          font-size: 16px;
          margin: 0;
        ",
          "body2": "
          font-weight: 400;
          text-transform: none;
          font-size: 16px;
          margin: 0;
          color: #444;
        ",
          "button": "
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
        ",
          "caption": "
          font-size: 0.75rem;
        ",
          "h1": "
          font-size: 158.74851706815767px;
          font-weight: bold;
          margin: 0;
        ",
          "h2": "
          font-size: 102.64598007738891px;
          font-weight: bold;
          margin: 0;
        ",
          "h3": "
          font-size: 57.11187507202838px;
          font-weight: bold;
          margin: 0;
        ",
          "h4": "
          font-size: 24px;
          font-weight: bold;
          line-height: 1.5;
          margin: 0;
        ",
          "h5": "
          font-size: 1rem;
          font-weight: bold;
          line-height: 1.5;
          margin: 0;
        ",
          "overline": "",
          "subtitle1": "
          font-size: 57.11187507202838px;
          font-weight: bold;
          color: #444;
          margin: 0;
        ",
          "subtitle2": "
          font-size: 24px;
          font-weight: bold;
          color: #444;
          margin: 0;
        ",
        },
        "gap": [Function],
        "golden": [Function],
        "shadows": Object {
          "emphasis": "0 0 30px 0 rgba(0,0,0,0.13)",
          "standard": "0 0 20px 0 rgba(0,0,0,0.13)",
          "subtle": "0 0 10px 0 rgba(0,0,0,0.10)",
        },
        "space": [Function],
        "zIndex": Object {
          "appBar": 1100,
          "drawer": 1200,
          "modal": 1300,
          "notification": 1400,
          "tooltip": 1500,
        },
      },
    }
  `);
  expect(Root).toBeDefined();
});

it('composes the classnames', () => {
  const useStyles = createStyles(() => ({
    root: 'root-from-styles',
    title: 'title-from-styles',
  }));

  function Component(props) {
    const { Root, styles, title } = useStyles(props);

    return (
      <Root>
        <h1 className={styles.title}>{title}</h1>
      </Root>
    );
  }

  let result;

  act(() => {
    result = create(
      <ThemeProvider theme={theme}>
        <Component
          className="root-from-class-name"
          style={{ border: '1px solid red' }}
          styles={{
            root: 'root-from-incoming-styles',
            title: 'title-from-incoming-styles',
          }}
          title="test title"
        />
      </ThemeProvider>,
    );
  });

  expect(result).toMatchInlineSnapshot(`
    <div
      className="hui_root_id-2_id-3 root-from-incoming-styles root-from-class-name"
      style={
        Object {
          "border": "1px solid red",
        }
      }
    >
      <h1
        className="hui_title_id-2_id-3 title-from-incoming-styles"
      >
        test title
      </h1>
    </div>
  `);
});

test("the root node doesn't remount when classnames changes", async () => {
  const done = new DeferredPromise();

  const useStyles = createStyles(() => ({
    root: 'style-root',
    title: 'style-title',
  }));

  const rerenderHandler = jest.fn();
  const rootClassHandler = jest.fn();

  function Component(props) {
    const { Root, styles } = useStyles(props);

    useEffect(() => {
      rerenderHandler();
    }, []);

    useEffect(() => {
      rootClassHandler(styles.root);
    }, [styles.root]);

    return <Root>test</Root>;
  }

  function Parent() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      (async () => {
        for (let i = 0; i < 3; i += 1) {
          await delay(0);
          setCount(count => count + 1);
        }
        done.resolve();
      })();
    }, []);

    return <Component styles={{ root: `count-${count}` }} />;
  }

  await act(async () => {
    create(
      <ThemeProvider theme={theme}>
        <Parent />
      </ThemeProvider>,
    );
    await done;
  });

  expect(rerenderHandler).toHaveBeenCalledTimes(1);

  const classNamesOverTime = rootClassHandler.mock.calls.map(args => args[0]);
  expect(classNamesOverTime).toMatchInlineSnapshot(`
    Array [
      "hui_root_id-4_id-5 count-0",
      "hui_root_id-4_id-5 count-1",
      "hui_root_id-4_id-5 count-2",
      "hui_root_id-4_id-5 count-3",
    ]
  `);
});

it('memoizes the Root component reference and the styles reference', async () => {
  const done = new DeferredPromise();

  const useStyles = createStyles(() => ({
    root: 'style-root',
    title: 'style-title',
  }));

  const rerenderHandler = jest.fn();
  const rootComponentHandler = jest.fn();
  const stylesHandler = jest.fn();

  function Component(props) {
    const { Root, styles } = useStyles(props);

    useEffect(() => {
      rerenderHandler();
    }, []);

    useEffect(() => {
      rootComponentHandler(Root);
    }, [Root]);

    useEffect(() => {
      stylesHandler(styles);
    }, [styles]);

    return <Root>test</Root>;
  }

  function Parent() {
    const [, setCount] = useState(0);

    useEffect(() => {
      (async () => {
        for (let i = 0; i < 3; i += 1) {
          await delay(0);
          setCount(count => count + 1);
        }
        done.resolve();
      })();
    }, []);

    return (
      <Component
        style={{ border: '1px solid red' }}
        styles={{ root: 'same-instance' }}
      />
    );
  }

  await act(async () => {
    create(
      <ThemeProvider theme={theme}>
        <Parent />
      </ThemeProvider>,
    );
    await done;
  });

  expect(rerenderHandler).toHaveBeenCalledTimes(1);
  expect(rootComponentHandler).toHaveBeenCalledTimes(1);
  expect(stylesHandler).toHaveBeenCalledTimes(1);
});

it('adds a style sheet to the DOM', async () => {
  const done = new DeferredPromise();

  const useStyles = createStyles(({ css }) => ({
    root: css`
      background-color: red;
    `,
  }));

  function Example(props) {
    const { Root, styles } = useStyles(props);

    useEffect(() => {
      done.resolve(styles);
    }, [styles]);

    return <Root>blah</Root>;
  }

  let styles;
  await act(async () => {
    create(
      <ThemeProvider theme={theme}>
        <Example />
      </ThemeProvider>,
    );

    styles = await done;
  });

  expect(styles).toMatchInlineSnapshot(`
    Object {
      "root": "hui_root_id-8_id-9",
    }
  `);
  const styleEls = Array.from(document.querySelectorAll('style'));

  const lastStyleEl = styleEls[styleEls.length - 1];

  expect(lastStyleEl.innerHTML).toMatchInlineSnapshot(
    `".hui_root_id-8_id-9{background-color:red;}"`,
  );
});
