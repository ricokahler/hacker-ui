// @pragma export
import React, { forwardRef } from 'react';
import createStyles, { PropsFromStyles } from './createStyles';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color }) => ({
  root: css`
    list-style-type: none;
    padding: 0;
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
