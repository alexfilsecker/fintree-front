import React, { useRef } from "react";

import useArrows from "@/hooks/useArrows";

export type ArrowSVGProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export type SVGProps = {
  containerWidth: number;
  containerHeight: number;
};

type ArrowProps = {
  parentRef: HTMLDivElement | undefined;
  childrenRefs: Array<HTMLDivElement | undefined> | undefined;
};

const Arrow = ({ parentRef, childrenRefs }: ArrowProps): JSX.Element => {
  const arrowRef = useRef<SVGSVGElement>(null);
  const arrowProps = useArrows({ parentRef, childrenRefs, arrowRef });

  const width = arrowProps?.svgProps.containerWidth ?? 20;
  const height = arrowProps?.svgProps.containerHeight ?? 20;

  return (
    <svg
      width="100%"
      height="30px"
      viewBox={`0 0 ${width} ${height}`}
      ref={arrowRef}
    >
      {arrowProps?.arrows.map((arrowProps, index) => (
        <line
          key={index}
          x1={arrowProps.startX}
          y1={arrowProps.startY}
          x2={arrowProps.endX}
          y2={arrowProps.endY}
          stroke="black"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
};

export default Arrow;
