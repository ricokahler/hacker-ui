import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { transparentize, readableColor } from 'polished';
import createStyles from './createStyles';
import { PropsFromStyles, TooltipProps } from './types';
import delay from './delay';
import useDebounce from './useDebounce';

const useStyles = createStyles(({ css, theme, givenSurface }) => ({
  root: css``,
  tooltip: css`
    ${theme.fonts.caption};
    position: absolute;
    pointer-events: auto;
    padding: ${theme.space(0.5)} ${theme.space(1)};
    min-width: ${theme.block(1)};
    text-align: center;
    color: ${readableColor(readableColor(givenSurface))};
    background-color: ${transparentize(0.2, readableColor(givenSurface))};
    z-index: ${theme.zIndex.tooltip};
  `,
  tooltipTop: css`
    transform: translate(-50%, -100%);
  `,
  tooltipLeft: css`
    transform: translate(-100%, -50%);
  `,
  tooltipBottom: css`
    transform: translate(-50%, 0);
  `,
  tooltipRight: css`
    transform: translate(0, -50%);
  `,
  tooltipContainer: css`
    position: fixed;
    pointer-events: none;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {
  title: React.ReactNode;
  children: (tooltipProps: TooltipProps) => void;
  // TODO: add `auto` option with intersection observer
  position?: 'top' | 'bottom' | 'left' | 'right';
}

function Tooltip(props: Props) {
  const { styles, title, children, position = 'top' } = useStyles(props);

  const rootRef = useRef<HTMLElement>(null);
  const [isMouseOverRoot, setIsMouseOverRoot] = useState(false);
  const [isMouseOverTooltip, setIsMouseOverTooltip] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const margin = 8;
  let tooltipTop: number;
  let tooltipLeft: number;

  const topCenter = top + height / 2;
  const leftCenter = left + width / 2;

  if (position === 'left') {
    tooltipTop = topCenter;
    tooltipLeft = left - margin;
  } else if (position === 'right') {
    tooltipTop = topCenter;
    tooltipLeft = left + width + margin;
  } else if (position === 'bottom') {
    tooltipTop = top + height + margin;
    tooltipLeft = leftCenter;
  } else {
    // position === 'top'
    tooltipTop = top - margin;
    tooltipLeft = leftCenter;
  }

  const [
    tooltipContainer,
    setTooltipContainer,
  ] = useState<HTMLDivElement | null>(null);

  const isMouseOver = isMouseOverRoot || isMouseOverTooltip;
  const debouncedMouseOver = useDebounce(isMouseOver, 500);

  // remove the tooltip container on scroll
  useEffect(() => {
    const handleScroll = () => {
      setTooltipContainer(null);
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // updates the coordinates of the tooltip
  useEffect(() => {
    let element = rootRef.current;
    if (!element) return;

    (async () => {
      while (debouncedMouseOver && !!tooltipContainer && !!element) {
        element = rootRef.current;
        if (!element) continue;

        const { top, left, width, height } = element.getBoundingClientRect();
        setTop(top);
        setLeft(left);
        setWidth(width);
        setHeight(height);

        await delay(250);
      }
    })();
  }, [debouncedMouseOver, rootRef, tooltipContainer]);

  // adds container to the DOM when the user mouses over
  useEffect(() => {
    if (!debouncedMouseOver) return;

    const tooltipContainer = document.createElement('div');
    tooltipContainer.classList.add(styles.tooltipContainer);
    document.body.appendChild(tooltipContainer);
    setTooltipContainer(tooltipContainer);

    return () => {
      document.body.removeChild(tooltipContainer);
    };
  }, [debouncedMouseOver, styles]);

  const handleEnterRoot = () => {
    setIsMouseOverRoot(true);
  };
  const handleLeaveRoot = () => {
    setIsMouseOverRoot(false);
  };
  const handleTooltipEnter = () => {
    setIsMouseOverTooltip(true);
  };
  const handleTooltipLeave = () => {
    setIsMouseOverTooltip(false);
  };

  return (
    <>
      {children({
        ref: rootRef,
        onMouseEnter: handleEnterRoot,
        onMouseLeave: handleLeaveRoot,
      })}

      {tooltipContainer &&
        createPortal(
          <div
            className={classNames(styles.tooltip, {
              [styles.tooltipTop]: position === 'top',
              [styles.tooltipBottom]: position === 'bottom',
              [styles.tooltipLeft]: position === 'left',
              [styles.tooltipRight]: position === 'right',
            })}
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
            style={{
              top: tooltipTop,
              left: tooltipLeft,
            }}
          >
            {title}
          </div>,
          tooltipContainer,
        )}
    </>
  );
}

export default Tooltip;
