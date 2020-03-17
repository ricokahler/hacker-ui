import React from 'react';
import { createStyles, PropsFromStyles } from 'react-style-system';

// useStyles is a custom hook
const useStyles = createStyles(({ css, theme }) => ({
  // define your classes here
  root: css`
    background-color: midnightblue;
    color: red;
  `,
  title: css`
    font-size: 24px;
    font-weight: bold;
  `,
}));

// if you're not using typescript, ignore this
interface Props extends PropsFromStyles<typeof useStyles> {
  title: string;
}

function MyComponent(props: Props) {
  // `useStyles` "intercepts" your props and adds two more things:
  //
  // - `Root` — a component meant to be used at the root of this component
  // - `styles` — an object that contains compiled class names from above
  const { Root, styles, title } = useStyles(props);

  return (
    // the `<Root />` component contains the root class
    // and also drills down the incoming `className`
    <Root>
      {/* styles.title is a string containing a class name */}
      <h1 className={styles.title}>{title}</h1>
    </Root>
  );
}

const Parent = () => <MyComponent title="Example Title" />;

export default Parent;
