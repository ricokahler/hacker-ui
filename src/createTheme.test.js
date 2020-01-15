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
