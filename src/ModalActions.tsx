import React, { forwardRef } from 'react';
import createStyles from './createStyles';
import { PropsFromStyles, ReactComponent } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    justify-content: flex-end;
    padding: 0 ${theme.space(1)};
    margin-top: ${theme.space(1)};
    & > *:not(:first-child) {
      margin-left: ${theme.space(1)};
    }
  `,
}));

type DivProps = JSX.IntrinsicElements['div'];
interface Props extends PropsFromStyles<typeof useStyles>, DivProps {
  component?: ReactComponent;
}

const ModalActions = forwardRef((props: Props, ref: React.Ref<HTMLElement>) => {
  const { Root, styles, component, ...restOfProps } = useStyles(
    props,
    props.component ?? 'div',
  );
  return <Root ref={ref} {...restOfProps} />;
});

export default ModalActions;
