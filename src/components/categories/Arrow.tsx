import React, { useRef } from "react";

import useArrow from "@/hooks/useArrow";

export type ArrowSVGProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  containerWidth: number;
  containerHeight: number;
};

type ArrowProps = {
  parentRef: HTMLDivElement | undefined;
  childRef: HTMLDivElement | undefined;
};

const Arrow = ({ parentRef, childRef }: ArrowProps): JSX.Element => {
  const arrowRef = useRef<SVGSVGElement>(null);
  const arrowProps = useArrow({ parentRef, childRef, arrowRef });

  return (
    <svg
      width="100%"
      height="60px"
      viewBox={`0 0 ${arrowProps === null ? "20" : arrowProps.containerWidth} ${arrowProps === null ? "20" : arrowProps.containerHeight}`}
      ref={arrowRef}
    >
      {arrowProps !== null && (
        <line
          x1={arrowProps.startX}
          y1={arrowProps.startY}
          x2={arrowProps.endX}
          y2={arrowProps.endY}
          stroke="black"
          strokeWidth="2"
        />
      )}
    </svg>
  );
};

export default Arrow;
