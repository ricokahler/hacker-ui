import createHierarchyFromFileNames from './createHierarchyFromFileNames';

it('creates a hierarchy from a flat file list', () => {
  const hierarchy = createHierarchyFromFileNames(
    [
      { path: '/prefix/foo.mdx', value: 'foo' },
      { path: '/prefix/bar.mdx', value: 'bar' },
      { path: '/prefix/nested/baz.mdx', value: 'baz' },
      { path: '/prefix/nested/example.thing.mdx', value: 'example thing' },
      { path: '/prefix/other/test-example.mdx', value: 'test example' },
      { path: '/prefix/sorted/0-zz.mdx', value: 'zz' },
      { path: '/prefix/sorted/1-azz.mdx', value: 'azz' },
    ],
    (item) => item.path,
  );

  expect(hierarchy).toMatchInlineSnapshot(`
    Array [
      Object {
        "title": "Bar",
        "value": "bar",
      },
      Object {
        "title": "Foo",
        "value": "foo",
      },
      Object {
        "title": "Nested",
        "value": Array [
          Object {
            "title": "Baz",
            "value": "baz",
          },
          Object {
            "title": "Example Thing",
            "value": "example thing",
          },
        ],
      },
      Object {
        "title": "Other",
        "value": Array [
          Object {
            "title": "Test Example",
            "value": "test example",
          },
        ],
      },
      Object {
        "title": "Sorted",
        "value": Array [
          Object {
            "title": "Zz",
            "value": "zz",
          },
          Object {
            "title": "Azz",
            "value": "azz",
          },
        ],
      },
    ]
  `);
});
