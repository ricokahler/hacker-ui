import React, { forwardRef } from 'react';
import { createStyles, PropsFromStyles } from 'react-style-system';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    flex: 1 1 auto;
    position: relative;
    min-height: 50vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  `,
}));

type DivProps = JSX.IntrinsicElements['div'];
interface Props extends PropsFromStyles<typeof useStyles>, DivProps {
  component?: ReactComponent;
}

const ModalContent = forwardRef((props: Props, ref: React.Ref<HTMLElement>) => {
  const { Root, styles, component, ...restOfProps } = useStyles(
    props,
    props.component ?? 'div',
  );

  return <Root ref={ref} {...restOfProps} />;
});

export default ModalContent;
