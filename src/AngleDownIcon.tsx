/**
 * this is a fontawesome 5 free icon
 * @license https://fontawesome.com/license
 */
import React, { forwardRef } from 'react';

// TODO: add types
const AngleDownIcon = forwardRef(
  (props: any, ref: React.Ref<SVGSVGElement>) => {
    return (
      <svg ref={ref} aria-hidden="true" viewBox="0 0 320 512" {...props}>
        <path
          fill="currentColor"
          d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
        />
      </svg>
    );
  },
);

AngleDownIcon.displayName = 'AngleDownIcon';

export default AngleDownIcon;
