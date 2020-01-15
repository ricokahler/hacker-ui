import React, { useEffect, useState } from 'react';
import { act, create } from 'react-test-renderer';
import delay from 'delay';
import DeferredPromise from './DeferredPromise';
import ThemeProvider from './ThemeProvider';
import createTheme from './createTheme';
import makeStyles from './makeStyles';

const theme = createTheme();

it('returns colors, styles, and the root component', async () => {
  const stylesHandler = jest.fn();
  const colorHandler = jest.fn();
  const rootHandler = jest.fn();
  const done = new DeferredPromise();

  const useStyles = makeStyles(color => {
    colorHandler(color);

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
  const colors = colorHandler.mock.calls[0][0];
  const Root = rootHandler.mock.calls[0][0];

  expect(styles).toMatchInlineSnapshot(`
    Object {
      "root": "root",
      "title": "title",
    }
  `);
  expect(colors).toMatchInlineSnapshot(`
    Object {
      "asBackground": "#000",
      "bgContrast": "#fff",
      "onSurface": "#000",
    }
  `);
  expect(Root).toBeDefined();
});

it('composes the classnames', () => {
  const useStyles = makeStyles(() => ({
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
      className="root-from-styles root-from-incoming-styles root-from-class-name"
      style={
        Object {
          "border": "1px solid red",
        }
      }
    >
      <h1
        className="title-from-styles title-from-incoming-styles"
      >
        test title
      </h1>
    </div>
  `);
});

test("the root node doesn't remount when classnames changes", async () => {
  const done = new DeferredPromise();

  const useStyles = makeStyles(() => ({
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
      "style-root count-0",
      "style-root count-1",
      "style-root count-2",
      "style-root count-3",
    ]
  `);
});

it('memoizes the Root component reference and the styles reference', async () => {
  const done = new DeferredPromise();

  const useStyles = makeStyles(() => ({
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
