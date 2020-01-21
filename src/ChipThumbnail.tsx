import React, { forwardRef } from 'react';
import createStyles from './createStyles';
import { PropsFromStyles, ReactComponent } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    width: ${theme.space(1.5)};
    height: ${theme.space(1.5)};
    margin-top: -${theme.space(0.5)};
    margin-bottom: -${theme.space(0.5)};
    margin-left: -${theme.space(0.5)};
    border-radius: 99999px;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & > svg {
      width: ${theme.space(1)};
      height: ${theme.space(1)};
    }
  `,
}));

type DivProps = JSX.IntrinsicElements['div'];
interface Props extends PropsFromStyles<typeof useStyles>, DivProps {
  component?: ReactComponent;
}

const ChipThumbnail = forwardRef(
  (props: Props, ref: React.Ref<HTMLDivElement>) => {
    const { Root, styles, component, ...restOfProps } = useStyles(
      props,
      props.component ?? 'div',
    );

    return <Root ref={ref} {...restOfProps} />;
  },
);

export default ChipThumbnail;
