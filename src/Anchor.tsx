import React, { forwardRef } from 'react';
import { transparentize } from 'polished';
import createStyles from './createStyles';
import { PropsFromStyles, ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color }) => ({
  root: css`
    color: ${color.onSurface};
    text-decoration: underline;
    transition: color ${theme.durations.standard}ms;

    &:active {
      color: ${transparentize(0.5, color.onSurface)};
    }
  `,
}));

type AnchorProps = JSX.IntrinsicElements['a'];
interface Props extends PropsFromStyles<typeof useStyles>, AnchorProps {
  component?: ReactComponent;
}

const Anchor = forwardRef((props: Props, ref: React.Ref<HTMLAnchorElement>) => {
  const { Root, styles, component, ...restOfProps } = useStyles(
    props,
    props.component || 'a',
  );

  return <Root ref={ref} {...restOfProps} />;
});

export default Anchor;
