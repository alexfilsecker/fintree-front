import { type RefObject, useEffect, useState } from "react";

import {
  type SVGProps,
  type ArrowSVGProps,
} from "@/components/categories/Arrows";

type useArrowProps = {
  parentRef: HTMLDivElement | undefined;
  childrenRefs: Array<HTMLDivElement | undefined> | undefined;
  arrowRef: RefObject<SVGSVGElement>;
};

type useArrowReturn = {
  arrows: ArrowSVGProps[];
  svgProps: SVGProps;
} | null;

const useArrows = ({
  parentRef,
  childrenRefs,
  arrowRef,
}: useArrowProps): useArrowReturn => {
  const [arrowProps, setArrowProps] = useState<ArrowSVGProps[] | null>(null);
  const [svgProps, setSVGProps] = useState<SVGProps | null>(null);

  useEffect(() => {
    if (parentRef === undefined) {
      return;
    }
    if (childrenRefs === undefined) {
      return;
    }
    if (arrowRef.current === null) {
      return;
    }
    if (childrenRefs.length === 0) {
      return;
    }

    const parentRect = parentRef.getBoundingClientRect();
    const arrowRect = arrowRef.current.getBoundingClientRect();

    const svgPropsVar = {
      containerWidth: arrowRect.width,
      containerHeight: arrowRect.height,
    };
    setSVGProps(svgPropsVar);

    const arrowsPropsVar = childrenRefs.map((childRef) => {
      if (childRef === undefined) {
        return null;
      }
      const childRect = childRef.getBoundingClientRect();

      const relativeParentRect = {
        top: parentRect.top - arrowRect.top,
        left: parentRect.left - arrowRect.left,
        right: parentRect.right - arrowRect.left,
        bottom: parentRect.bottom - arrowRect.bottom,
        width: parentRect.width,
        height: parentRect.height,
      };
      const relativeChildRect = {
        top: childRect.top - arrowRect.top,
        left: childRect.left - arrowRect.left,
        right: childRect.right - arrowRect.left,
        bottom: childRect.bottom - arrowRect.top,
        width: childRect.width,
        height: childRect.height,
      };

      return {
        startX: relativeParentRect.left + relativeParentRect.width / 2,
        startY: 0,
        endX: relativeChildRect.left + relativeChildRect.width / 2,
        endY: relativeChildRect.top,
        containerWidth: arrowRect.width,
        containerHeight: arrowRect.height,
      };
    });

    if (arrowsPropsVar.some((arrowProps) => arrowProps === null)) {
      return;
    }

    setArrowProps(arrowsPropsVar as ArrowSVGProps[]);
  }, [arrowRef, childrenRefs, parentRef]);

  if (arrowProps === null || arrowProps.length === 0 || svgProps === null) {
    return null;
  }

  return {
    arrows: arrowProps,
    svgProps,
  };
};

export default useArrows;
