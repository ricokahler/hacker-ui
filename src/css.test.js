import css from './css';

it("re-exports the string it's given", () => {
  const test = css`
    display: flex;
    flex-direction: column;
  `;

  expect(test).toMatchInlineSnapshot(`
    "
        display: flex;
        flex-direction: column;
      "
  `);
});
