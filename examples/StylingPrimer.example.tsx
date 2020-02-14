import React from 'react';
import { createStyles, PropsFromStyles } from 'hacker-ui';

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

// ============================================================
// Normally, you would have 👆 these 👇 in two different files.
// ============================================================

const useParentStyles = createStyles(({ css }) => ({
  root: css``,
  myComponent: css`
    border: 1px solid blue;
  `,
  changedTitle: css`
    color: aquamarine;
  `,
}));

interface ParentProps extends PropsFromStyles<typeof useStyles> {}

function ParentComponent(props: ParentProps) {
  const { Root, styles } = useParentStyles(props, 'section');

  return (
    <Root>
      <MyComponent
        title="Example"
        //
        // Hacker UI propagates the `className` to the root component
        //
        className={styles.myComponent}
        //
        // And also the `style` to the root component
        //
        style={{ margin: 50 }}
        //
        // And you can override individual className of the component with
        // the `styles` prop
        //
        styles={{ title: styles.changedTitle }}
      />
    </Root>
  );
}

export default ParentComponent;
