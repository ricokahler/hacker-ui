import React, { forwardRef } from 'react';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    ${theme.fonts.body1};
    display: flex;
  `,
}));

type ListItemProps = JSX.IntrinsicElements['li'];
interface Props extends ListItemProps, PropsFromStyles<typeof useStyles> {}

const ListItem = forwardRef((props: Props, ref: React.Ref<HTMLLIElement>) => {
  const { Root, styles, ...restOfProps } = useStyles(props, 'li');
  return <Root ref={ref} {...restOfProps} />;
});

export default ListItem;
