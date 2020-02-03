import React, { forwardRef } from 'react';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

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
interface Props extends SpanProps, PropsFromStyles<typeof useStyles> {
  label: string;
}

const Emoji = forwardRef((props: Props, ref: React.Ref<HTMLSpanElement>) => {
  const { Root, styles, label, children, ...restOfProps } = useStyles(
    props,
    'span',
  );

  return (
    <Root role="img" aria-label={label} ref={ref} {...restOfProps}>
      <div className={styles.wrapper}>{children}</div>
    </Root>
  );
});

export default Emoji;
