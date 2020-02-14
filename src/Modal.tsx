import React, { forwardRef, useState, useEffect } from 'react';
import { transparentize, readableColor } from 'polished';
import { createPortal } from 'react-dom';
import createStyles from './createStyles';
import { PropsFromStyles, ReactComponent } from './types';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    max-height: 90vh;
    width: ${theme.block(8)};
    max-width: 100%;
    background-color: ${theme.colors.surface};
    color: ${readableColor(theme.colors.surface)};
    z-index: ${theme.zIndex.modal};
    margin: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
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
    background-color: ${transparentize(0.5, 'black')};
    z-index: ${theme.zIndex.modal};
  `,
}));

type SectionProps = JSX.IntrinsicElements['section'];
interface Props extends PropsFromStyles<typeof useStyles>, SectionProps {
  open: boolean;
  onClose: () => void;
  component?: ReactComponent;
  // TODO: add sizes and responsive modals
}

const Modal = forwardRef((props: Props, ref: React.Ref<HTMLElement>) => {
  const {
    Root,
    styles,
    open,
    // TODO: in the future, we should bind to the escape button for closing
    onClose,
    ...restOfProps
  } = useStyles(props, props.component ?? 'section');
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  // TODO: animations would be a nice-to-have
  useEffect(() => {
    if (!open) return;

    const container = document.createElement('div');
    container.classList.add(styles.container);

    document.body.appendChild(container);
    setContainer(container);

    return () => {
      document.body.removeChild(container);
      setContainer(null);
    };
  }, [open, styles.container]);

  // TODO: throw something in the DOM later for SSR SEO
  return (
    container &&
    createPortal(
      <>
        <div className={styles.backdrop} onClick={onClose} />
        <Root ref={ref} {...restOfProps} />
      </>,
      container,
    )
  );
});

export default Modal;
