import React, { forwardRef } from 'react';
import { createStyles, PropsFromStyles, mix } from 'react-style-system';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, color, surface }) => ({
  root: css`
    color: ${color.readable};
    text-decoration: none;
    transition: color ${theme.duration.standard};

    &:hover {
      text-decoration: underline;
    }

    &:active {
      color: ${mix(color.readable, surface, 0.3)};
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
    props.component ?? 'a',
  );

  return <Root className="hui-anchor" ref={ref} {...restOfProps} />;
});

Anchor.displayName = 'Anchor';

export default Anchor;
