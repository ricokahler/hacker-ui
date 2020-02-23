import React, { forwardRef } from 'react';
import { createStyles, PropsFromStyles } from 'react-style-system';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css }) => ({
  root: css`
    list-style-type: none;
    padding: 0;
    margin: 0;
  `,
}));

type UnorderedListedProps = JSX.IntrinsicElements['ul'];
interface Props
  extends PropsFromStyles<typeof useStyles>,
    UnorderedListedProps {
  component?: ReactComponent;
}

const List = forwardRef((props: Props, ref: React.Ref<HTMLUListElement>) => {
  const { Root, styles, ...restOfProps } = useStyles(
    props,
    'ul' || props.component,
  );

  return <Root ref={ref} {...restOfProps} />;
});

export default List;
