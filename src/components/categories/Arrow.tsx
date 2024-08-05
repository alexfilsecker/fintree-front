import React from "react";

export type ArrowProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  containerWidth: number;
  containerHeight: number;
};

const Arrow = ({
  startX,
  startY,
  endX,
  endY,
  containerWidth,
  containerHeight,
}: ArrowProps): JSX.Element => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${containerWidth} ${containerHeight}`}
    >
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Arrow;
