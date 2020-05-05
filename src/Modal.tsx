import React, { forwardRef, useState, useEffect } from 'react';
import { transparentize, readableColor } from 'polished';
import { createPortal } from 'react-dom';
import { createStyles, PropsFromStyles } from 'react-style-system';
import { ReactComponent } from './types';

const useStyles = createStyles(({ css, theme, staticVar }) => ({
  root: css`
    max-height: 90%;
    width: ${theme.block(8)};
    max-width: 100%;
    background-color: ${theme.colors.surface};
    color: ${readableColor(theme.colors.surface)};
    z-index: ${theme.zIndex.modal};
    margin: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: ${theme.zIndex.modal};
  `,
  container: css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
  `,
  backdrop: css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${staticVar(transparentize(0.5, 'black'))};
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
    component: _component,
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
  }, [open, props.style, styles.container]);

  useEffect(() => {
    if (!container) return;
    for (const [k, v] of Object.entries(styles.cssVariableObject)) {
      container.style.setProperty(k, v);
    }
  }, [container, styles.cssVariableObject]);

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

Modal.displayName = 'Modal';

export default Modal;
