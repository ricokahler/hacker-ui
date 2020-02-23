import React, { forwardRef } from 'react';

// TODO: add types
const CircleIcon = forwardRef((props: any, ref: React.Ref<SVGSVGElement>) => {
  return (
    <svg ref={ref} aria-hidden="true" viewBox="0 0 512 512" {...props}>
      <circle cx="256" cy="256" fill="currentColor" r="192" />
    </svg>
  );
});

export default CircleIcon;
