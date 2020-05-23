import React, { forwardRef } from 'react';
import { createStyles, PropsFromStyles } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    ${theme.body1};
    display: flex;
  `,
}));

type ListItemProps = JSX.IntrinsicElements['li'];
interface Props extends ListItemProps, PropsFromStyles<typeof useStyles> {}

const ListItem = forwardRef((props: Props, ref: React.Ref<HTMLLIElement>) => {
  const { Root, styles, ...restOfProps } = useStyles(props, 'li');
  return <Root ref={ref} {...restOfProps} />;
});

ListItem.displayName = 'ListItem';

export default ListItem;
