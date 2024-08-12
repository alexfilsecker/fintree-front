import { type RefObject, useEffect, useState } from "react";

import { type ArrowSVGProps } from "@/components/categories/Arrow";

type useArrowProps = {
  parentRef: HTMLDivElement | undefined;
  childRef: HTMLDivElement | undefined;
  arrowRef: RefObject<SVGSVGElement>;
};

const useArrow = ({
  parentRef,
  childRef,
  arrowRef,
}: useArrowProps): ArrowSVGProps | null => {
  const [arrowProps, setArrowProps] = useState<ArrowSVGProps | null>(null);

  useEffect(() => {
    if (parentRef === undefined) {
      return;
    }
    if (childRef === undefined) {
      return;
    }
    if (arrowRef.current === null) {
      return;
    }

    const parentRect = parentRef.getBoundingClientRect();
    const arrowRect = arrowRef.current.getBoundingClientRect();
    const childRect = childRef.getBoundingClientRect();

    const relativeDiv1Rect = {
      top: parentRect.top - arrowRect.top,
      left: parentRect.left - arrowRect.left,
      right: parentRect.right - arrowRect.left,
      bottom: parentRect.bottom - arrowRect.top,
      width: parentRect.width,
      height: parentRect.height,
    };
    const relativeDiv2Rect = {
      top: childRect.top - arrowRect.top,
      left: childRect.left - arrowRect.left,
      right: childRect.right - arrowRect.left,
      bottom: childRect.bottom - arrowRect.top,
      width: childRect.width,
      height: childRect.height,
    };

    const arrowPropsVar = {
      startX: relativeDiv1Rect.left + relativeDiv1Rect.width / 2,
      // startY: relativeDiv1Rect.bottom,
      startY: 0,
      endX: relativeDiv2Rect.left + relativeDiv2Rect.width / 2,
      endY: relativeDiv2Rect.top,
      containerWidth: arrowRect.width,
      containerHeight: arrowRect.height,
    };

    setArrowProps(arrowPropsVar);
  }, [arrowRef, childRef, parentRef]);

  return arrowProps;
};

export default useArrow;
