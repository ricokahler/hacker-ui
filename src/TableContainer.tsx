import React, { forwardRef } from 'react';
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
  responsive?: boolean;
}

const TableContainer = forwardRef((props: Props, ref: React.Ref<any>) => {
  const { Root, styles, responsive = true, ...restOfProps } = useStyles(
    props,
    'div',
  );

  return (
    <Root
      className={classNames({ [styles.responsive]: responsive })}
      ref={ref}
      {...restOfProps}
    />
  );
});

TableContainer.displayName = 'TableContainer';

export default TableContainer;
