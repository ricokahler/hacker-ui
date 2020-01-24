import flattenDocArray from './flattenDocArray';

it('takes in a nested doc and returns flattened route props', () => {
  const docArray = [
    {
      title: 'Folder',
      value: [
        {
          title: 'Bar',
          value: 'blah',
        },
        {
          title: 'Foo',
          value: 'blah',
        },
      ],
    },
    {
      title: 'Test',
      value: 'blah',
    },
  ];

  expect(flattenDocArray(docArray)).toMatchInlineSnapshot(`
    Array [
      Object {
        "component": "blah",
        "path": "/folder/bar",
        "title": "Bar",
      },
      Object {
        "component": "blah",
        "path": "/folder/foo",
        "title": "Foo",
      },
      Object {
        "component": "blah",
        "path": "/test",
        "title": "Test",
      },
    ]
  `);
});
