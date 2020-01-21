/**
 * this is a fontawesome 5 free icon
 * @license https://fontawesome.com/license
 */
import React, { forwardRef } from 'react';

type SvgProps = JSX.IntrinsicElements['svg'];
const TimesIcon = forwardRef(
  (props: SvgProps, ref: React.Ref<SVGSVGElement>) => {
    return (
      <svg ref={ref} aria-hidden="true" viewBox="0 0 352 512" {...props}>
        <path
          fill="currentColor"
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
        />
      </svg>
    );
  },
);

export default TimesIcon;
