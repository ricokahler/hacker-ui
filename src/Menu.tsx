import React, { forwardRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { createStyles, PropsFromStyles } from 'react-style-system';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    position: absolute;
    width: ${theme.block(2)};
    box-shadow: ${theme.shadows.subtle};
    background-color: ${theme.colors.surface};
    z-index: ${theme.zIndex.modal};
  `,
  top: css`
    transform: translate(-50%, -100%);
  `,
  left: css`
    transform: translate(-100%, -50%);
  `,
  bottom: css`
    transform: translate(-50%, 0);
  `,
  right: css`
    transform: translate(0, -50%);
  `,
  container: css`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
  `,
  backdrop: css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: ${theme.zIndex.modal};
  `,
}));

type DivProps = JSX.IntrinsicElements['div'];
interface Props extends PropsFromStyles<typeof useStyles>, DivProps {
  anchorEl: HTMLElement | null;
  onClose?: (e: React.MouseEvent<any>) => void;
  component?: ReactComponent;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
}

const Menu = forwardRef((props: Props, ref: React.Ref<any>) => {
  const {
    Root,
    styles,
    anchorEl,
    onClose,
    component,
    position = 'bottom',
    children,
    ...restOfProps
  } = useStyles(props, props.component ? props.component : 'div');

  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [boundingBox, setBoundingBox] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  let top: number;
  let left: number;

  const topCenter = boundingBox.top + boundingBox.height / 2;
  const leftCenter = boundingBox.left + boundingBox.width / 2;

  // TODO: possibly add other positions:
  // ellipsis menus with icons buttons look bad
  if (position === 'left') {
    top = topCenter;
    left = boundingBox.left;
  } else if (position === 'right') {
    top = topCenter;
    left = boundingBox.left + boundingBox.width;
  } else if (position === 'bottom') {
    top = boundingBox.top + boundingBox.height;
    left = leftCenter;
  } else {
    top = boundingBox.top;
    left = leftCenter;
  }

  // TODO: animations would be nice
  useEffect(() => {
    if (!anchorEl) return;

    const container = document.createElement('div');
    container.classList.add(styles.container);

    document.body.appendChild(container);
    setContainer(container);

    const { top, left, width, height } = anchorEl.getBoundingClientRect();
    setBoundingBox({ top, left, width, height });

    return () => {
      document.body.removeChild(container);
      setContainer(null);
    };
  }, [anchorEl, styles.container]);

  return (
    container &&
    createPortal(
      <>
        <div className={styles.backdrop} onClick={onClose} />
        <Root
          className={classNames({
            [styles.top]: position === 'top',
            [styles.bottom]: position === 'bottom',
            [styles.left]: position === 'left',
            [styles.right]: position === 'right',
          })}
          ref={ref}
          style={{ top, left }}
          {...restOfProps}
        >
          {children}
        </Root>
      </>,
      container,
    )
  );
});

export default Menu;
