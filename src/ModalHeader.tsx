import React, { forwardRef } from 'react';
import createStyles from './createStyles';
import { PropsFromStyles, ReactComponent } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 0 0 auto;
    padding: ${theme.space(1)} 0;
  `,
}));

type HeaderProps = JSX.IntrinsicElements['header'];
interface Props extends PropsFromStyles<typeof useStyles>, HeaderProps {
  component?: ReactComponent;
}

const ModalHeader = forwardRef((props: Props, ref: React.Ref<HTMLElement>) => {
  const { Root, styles, component, ...restOfProps } = useStyles(
    props,
    props.component ?? 'header',
  );
  return <Root ref={ref} {...restOfProps} />;
});

export default ModalHeader;
