import React, { useState, useEffect, useRef } from "react";

import Arrow, { type ArrowProps } from "./Arrow";

const ArrowBetweenDivs = (): JSX.Element => {
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const [arrowProps, setArrowProps] = useState<ArrowProps | null>(null);

  useEffect(() => {
    if (
      div1Ref.current === null ||
      div2Ref.current === null ||
      parentRef.current === null
    ) {
      return;
    }
    const div1Rect = div1Ref.current.getBoundingClientRect();
    const div2Rect = div2Ref.current.getBoundingClientRect();
    const parentRect = parentRef.current.getBoundingClientRect();

    const relativeDiv1Rect = {
      top: div1Rect.top - parentRect.top,
      left: div1Rect.left - parentRect.left,
      right: div1Rect.right - parentRect.left,
      bottom: div1Rect.bottom - parentRect.top,
      width: div1Rect.width,
      height: div1Rect.height,
    };
    const relativeDiv2Rect = {
      top: div2Rect.top - parentRect.top,
      left: div2Rect.left - parentRect.left,
      right: div2Rect.right - parentRect.left,
      bottom: div2Rect.bottom - parentRect.top,
      width: div2Rect.width,
      height: div2Rect.height,
    };

    const arrowProps = {
      startX: relativeDiv1Rect.left + relativeDiv1Rect.width / 2,
      startY: relativeDiv1Rect.bottom,
      endX: relativeDiv2Rect.left + relativeDiv2Rect.width / 2,
      endY: relativeDiv2Rect.top,
      containerWidth: parentRect.width,
      containerHeight: parentRect.height,
    };
    console.log("🚀 - arrowProps:", arrowProps);

    setArrowProps(arrowProps);
  }, []);

  return (
    <div ref={parentRef}>
      <div ref={div1Ref}>Div 1</div>
      {arrowProps !== null && <Arrow {...arrowProps} />}
      <div ref={div2Ref}>Div 2</div>
    </div>
  );
};

export default ArrowBetweenDivs;
