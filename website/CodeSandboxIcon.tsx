import React, { forwardRef } from 'react';

type SvgProps = JSX.IntrinsicElements['svg'];
const CodeSandboxIcon = forwardRef(
  (props: SvgProps, ref: React.Ref<SVGSVGElement>) => {
    return (
      <svg
        viewBox="0 0 256 296"
        preserveAspectRatio="xMidYMid"
        ref={ref}
        {...props}
      >
        <path
          fill="currentColor"
          d="M115.498 261.088v-106.61L23.814 101.73v60.773l41.996 24.347v45.7l49.688 28.54zm23.814.627l50.605-29.151V185.78l42.269-24.495v-60.011l-92.874 53.621v106.82zm80.66-180.887l-48.817-28.289-42.863 24.872-43.188-24.897-49.252 28.667 91.914 52.882 92.206-53.235zM0 222.212V74.495L127.987 0 256 74.182v147.797l-128.016 73.744L0 222.212z"
        />
      </svg>
    );
  },
);

export default CodeSandboxIcon;
