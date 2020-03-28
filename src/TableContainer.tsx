import React from 'react';
import classNames from 'classnames';
import createStyles from './createStyles';
import { PropsFromStyles } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  // table container base styles
  root: css`
    border-radius: ${theme.borderRadius};
    margin: ${theme.space(1)} ${theme.space(0.5)};
    box-shadow: 0px 2px 6px 0px ${theme.colors.bland};
  `,
  responsive: css`
    overflow: auto;
  `,
}));

type TableContainerProps = JSX.IntrinsicElements['div'];

interface Props extends PropsFromStyles<typeof useStyles>, TableContainerProps {
  children: React.ReactNode;
  responsive?: boolean;
}

const TableContainer = (props: Props) => {
  const { Root, styles, children, responsive = true } = useStyles(props, 'div');

  return (
    <Root className={classNames({ [styles.responsive]: responsive })}>
      {children}
    </Root>
  );
};

export default TableContainer;
