import React, { forwardRef } from 'react';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  // table body base styles
  root: css``,
}));

type TableBodyProps = JSX.IntrinsicElements['tbody'];

interface Props extends PropsFromStyles<typeof useStyles>, TableBodyProps {}

const TableBody = forwardRef((props: Props, ref: React.Ref<any>) => {
  const { Root, styles, ...restOfProps } = useStyles(props, 'tbody');
  return <Root ref={ref} {...restOfProps} />;
});

TableBody.displayName = 'TableBody';

export default TableBody;
