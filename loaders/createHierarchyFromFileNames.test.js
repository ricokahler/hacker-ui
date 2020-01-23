import createHierarchyFromFileNames from './createHierarchyFromFileNames';

it('creates a hierarchy from a flat file list', () => {
  const hierarchy = createHierarchyFromFileNames(
    [
      { path: '/prefix/foo.mdx', component: 'foo' },
      { path: '/prefix/bar.mdx', component: 'bar' },
      { path: '/prefix/nested/baz.mdx', component: 'baz' },
      { path: '/prefix/nested/example.thing.mdx', component: 'example thing' },
      { path: '/prefix/other/test-example.mdx', component: 'test example' },
      { path: '/prefix/sorted/0-zz.mdx', component: 'zz' },
      { path: '/prefix/sorted/1-azz.mdx', component: 'azz' },
    ],
    item => item.path,
  );

  expect(hierarchy).toMatchInlineSnapshot(`
    Array [
      Object {
        "component": "bar",
        "title": "Bar",
      },
      Object {
        "component": "foo",
        "title": "Foo",
      },
      Object {
        "component": Array [
          Object {
            "component": "baz",
            "title": "Baz",
          },
          Object {
            "component": "example thing",
            "title": "Example Thing",
          },
        ],
        "title": "Nested",
      },
      Object {
        "component": Array [
          Object {
            "component": "test example",
            "title": "Test Example",
          },
        ],
        "title": "Other",
      },
      Object {
        "component": Array [
          Object {
            "component": "zz",
            "title": "Zz",
          },
          Object {
            "component": "azz",
            "title": "Azz",
          },
        ],
        "title": "Sorted",
      },
    ]
  `);
});
