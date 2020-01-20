/**
 * this is a fontawesome 5 free icon
 * @license https://fontawesome.com/license
 */
import React, { forwardRef } from 'react';

type SvgProps = JSX.IntrinsicElements['svg'];
const CheckIcon = forwardRef(
  (props: SvgProps, ref: React.Ref<SVGSVGElement>) => {
    return (
      <svg ref={ref} aria-hidden="true" viewBox="0 0 512 512" {...props}>
        <path
          fill="currentColor"
          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
        />
      </svg>
    );
  },
);

export default CheckIcon;
