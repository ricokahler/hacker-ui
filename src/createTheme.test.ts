import createTheme, { recursiveMerge } from './createTheme';

jest.mock('./defaultTheme', () => ({ mockTheme: true }));

describe('recursiveMerge', () => {
  it('returns a new object, merging the incoming obj from the base obj', () => {
    const base = {
      test: {
        foo: 'hello',
        nested: {
          nestedValue: 'test',
        },
      },
    };

    const incoming = {
      test: {
        foo: 'changed',
        bar: 'addition',
        nested: {
          blah: 'test',
        },
      },
    };

    const result = recursiveMerge(base, incoming);

    expect(result).toMatchInlineSnapshot(`
      Object {
        "test": Object {
          "bar": "addition",
          "foo": "changed",
          "nested": Object {
            "blah": "test",
            "nestedValue": "test",
          },
        },
      }
    `);
  });

  it('allows base getters to be overridden with a non getter', () => {
    const base = {
      hello: 'world',
      get testGetter() {
        return this.hello;
      },
    };
    const incoming = {
      testGetter: 'this thing',
    };
    const result = recursiveMerge(base, incoming);

    expect(result).toMatchInlineSnapshot(`
      Object {
        "hello": "world",
        "testGetter": "this thing",
      }
    `);
  });

  it('propagates incoming getters', () => {
    const base = {
      hello: 'from base',
      testGetter: 'not a getter',
    };
    const incoming = {
      get testGetter() {
        return this.hello;
      },
    };

    const result = recursiveMerge(base, incoming);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "hello": "from base",
        "testGetter": "from base",
      }
    `);
  });

  it('propagates base getters', () => {
    const base = {
      hello: 'world',
      get testGetter() {
        return this.hello;
      },
    };
    const incoming = {
      hello: 'from incoming',
    };

    const result = recursiveMerge(base, incoming);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "hello": "from incoming",
        "testGetter": "from incoming",
      }
    `);
  });
});

it('calls recursiveMerge with the default theme', () => {
  const result = createTheme({ incoming: true });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "incoming": true,
      "mockTheme": true,
    }
  `);
});

it('works with no params', () => {
  const result = createTheme();

  expect(result).toMatchInlineSnapshot(`
    Object {
      "mockTheme": true,
    }
  `);
});

// this test is for typescript types only and doesn't do anything runtime wise
it('types', () => {
  const result = createTheme({
    testNewThing: {
      red: true,
    },
  });

  expect(result.testNewThing.red).toBeDefined();
});
