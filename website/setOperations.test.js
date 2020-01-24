import { add, remove, toggle } from './set-operations';

const set = {
  foo: true,
  bar: true,
};

describe('add', () => {
  it('adds a value to the set', () => {
    expect(add(set, 'baz')).toMatchInlineSnapshot(`
      Object {
        "bar": true,
        "baz": true,
        "foo": true,
      }
    `);
  });
});

describe('remove', () => {
  it('removes a value from the set', () => {
    expect(remove(set, 'foo')).toMatchInlineSnapshot(`
      Object {
        "bar": true,
      }
    `);
  });
});

describe('toggle', () => {
  it("adds if it's not there", () => {
    expect(toggle(set, 'baz')).toMatchInlineSnapshot(`
      Object {
        "bar": true,
        "baz": true,
        "foo": true,
      }
    `);
  });
  it('removes if it is there', () => {
    expect(toggle(set, 'foo')).toMatchInlineSnapshot(`
      Object {
        "bar": true,
      }
    `);
  });
});
