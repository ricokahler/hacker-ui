import React, { forwardRef } from 'react';
import { createStyles, PropsFromStyles } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    height: 1em;
    line-height: 1;
    width: 1.7em;
    display: inline-flex;
    position: relative;
    overflow: visible;
  `,
  wrapper: css`
    font-size: 1.7em;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  `,
}));

type SpanProps = JSX.IntrinsicElements['span'];
interface Props extends SpanProps, PropsFromStyles<typeof useStyles> {}

const Emoji = forwardRef((props: Props, ref: React.Ref<HTMLSpanElement>) => {
  const { Root, styles, children, ...restOfProps } = useStyles(props, 'span');

  return (
    <Root ref={ref} {...restOfProps}>
      <span className={styles.wrapper}>{children}</span>
    </Root>
  );
});

Emoji.displayName = 'Emoji';

export default Emoji;
