import React, { forwardRef } from 'react';
import { createStyles, PropsFromStyles } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  // table caption base styles
  root: css`
    ${theme.fonts.caption}
    display: table-caption;
    text-align: center;
    margin: ${theme.space(1)};
    caption-side: bottom;
  `,
}));

type TableCaptionProps = JSX.IntrinsicElements['caption'];

interface Props extends PropsFromStyles<typeof useStyles>, TableCaptionProps {}

const TableCaption = forwardRef((props: Props, ref: React.Ref<any>) => {
  const { Root, styles, ...restOfProps } = useStyles(props, 'caption');
  return <Root ref={ref} {...restOfProps} />;
});

TableCaption.displayName = 'TableCaption';

export default TableCaption;
