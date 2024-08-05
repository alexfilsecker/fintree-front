import {
  type MutableRefObject,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Stage, Layer, type Group } from "react-konva";

import Category from "./Category";

import type Konva from "konva";

export type DBCategory = {
  id: number;
  name: string;
  parentId?: number;
};

type CategoryWithPosition = DBCategory & {
  position: number[];
  childrenIds: number[];
};

const addPosition = (
  categories: DBCategory[]
): Map<number, CategoryWithPosition> => {
  const categoryMap = new Map<number, CategoryWithPosition>();

  // Create a map for quick lookup by id
  categories.forEach((category) => {
    const categoryWithPosition: CategoryWithPosition = {
      ...category,
      position: [],
      childrenIds: [],
    };
    categoryMap.set(category.id, categoryWithPosition);
  });

  const buildPosition = (
    category: CategoryWithPosition,
    parentPosition: number[],
    index: number
  ): void => {
    category.position = [...parentPosition, index];
    const children = categories.filter(
      (child) => child.parentId === category.id
    );
    category.childrenIds = children.map((child) => child.id);
    children.forEach((child, childIndex) => {
      const childWithPosition = categoryMap.get(child.id);
      if (childWithPosition === undefined) {
        console.error(`Category with id ${child.id} not found`);
        return;
      }
      buildPosition(childWithPosition, category.position, childIndex);
    });
  };

  // Process base categories
  categories
    .filter((category) => category.parentId === undefined)
    .forEach((category, index) => {
      const categoryWithPosition = categoryMap.get(category.id);
      if (categoryWithPosition === undefined) {
        console.error(`Category with id ${category.id} not found`);
        return;
      }
      buildPosition(categoryWithPosition, [], index);
    });

  return categoryMap;
};

const categories: DBCategory[] = [
  { id: 1, name: "Category A" },
  { id: 2, name: "Category B" },
  { id: 3, name: "Category C", parentId: 1 },
  { id: 8, name: "Category I", parentId: 1 },
  { id: 4, name: "Category D", parentId: 1 },
  { id: 5, name: "Category E", parentId: 4 },
  { id: 6, name: "Category F", parentId: 4 },
  { id: 7, name: "Category G", parentId: 2 },
];

const categoriesWithPosition = addPosition(categories);
// categoriesWithPosition.forEach((category) => {
//   console.log("name", category.name, "position", category.position);
// });

type CategoryWithWidth = CategoryWithPosition & {
  width: number;
  descendantWidth: number;
};

const addWidths = (
  categories: Map<number, CategoryWithPosition>,
  refs: MutableRefObject<Map<number, Konva.Rect>>
): Map<number, CategoryWithWidth> => {
  const descendantWidthMap = new Map<number, CategoryWithWidth>();

  categories.forEach((category) => {
    const categoryRef = refs.current.get(category.id);
    const width = categoryRef?.width() ?? 0;
    descendantWidthMap.set(category.id, {
      ...category,
      width,
      descendantWidth: 0,
    });
  });

  const recursiveWidth = (category: CategoryWithWidth): void => {
    const childrenIds = category.childrenIds;
    if (childrenIds.length === 0) {
      category.descendantWidth = category.width;
      return;
    }
    childrenIds.forEach((childId) => {
      const child = descendantWidthMap.get(childId);
      if (child === undefined) {
        console.error(`Category with id ${childId} not found`);
        return;
      }
      recursiveWidth(child);
      category.descendantWidth += child.descendantWidth;
    });
  };

  Array.from(descendantWidthMap.values())
    .filter((category) => category.parentId === undefined)
    .forEach((parentCategory) => {
      recursiveWidth(parentCategory);
    });

  return descendantWidthMap;
};

// const categoriesWithWidth = addWidths(categoriesWithPosition);

type CategoryWithCenter = CategoryWithWidth & {
  center: { x: number; y: number };
};

const calculateCenters = (
  categories: Map<number, CategoryWithWidth>
): Map<number, CategoryWithCenter> => {
  const categoriesWithCenter = new Map<number, CategoryWithCenter>();
  categories.forEach((category) => {
    categoriesWithCenter.set(category.id, {
      ...category,
      center: { x: 0, y: 0 },
    });
  });

  const setCenter = (
    category: CategoryWithCenter,
    siblingFinish: number
  ): number => {
    const gapX = 0;
    const x = siblingFinish + gapX + category.descendantWidth / 2;
    const myXFinish = siblingFinish + gapX + category.descendantWidth;
    const y = category.position.length * 100;
    category.center = { x, y };

    // console.log(
    //   "seting center for",
    //   category.name,
    //   "at",
    //   { x, y },
    //   "finish",
    //   myXFinish,
    //   "siblingFinish",
    //   siblingFinish
    // );

    const childrenIds = category.childrenIds;

    let childFinish = siblingFinish;
    childrenIds.forEach((childId) => {
      const child = categoriesWithCenter.get(childId);
      if (child === undefined) {
        console.error(`Category with id ${childId} not found`);
        return;
      }
      childFinish = setCenter(child, childFinish);
    });

    return myXFinish;
  };

  let siblingFinish = 100;
  Array.from(categories.values())
    .filter((category) => category.parentId === undefined)
    .forEach((category) => {
      const categoryWithCenter = categoriesWithCenter.get(category.id);
      if (categoryWithCenter === undefined) {
        console.error(`Category with id ${category.id} not found
        `);
        return;
      }
      siblingFinish = setCenter(categoryWithCenter, siblingFinish);
    });

  return categoriesWithCenter;
};

// const categoriesWithCenter = calculateCenters(categoriesWithWidth);
// categoriesWithCenter.forEach((category) => {
//   console.log(
//     "name",
//     category.name,
//     "position",
//     category.position,
//     "center",
//     category.center,
//     "descendantWidth",
//     category.descendantWidth
//   );
// });

const Canvas = (): JSX.Element => {
  // const [categories, setCategories] =
  //   useState<Map<number, CategoryWithCenter>>(categoriesWithCenter);

  const categoryRefs = useRef<Map<number, Konva.Rect>>(new Map());
  useEffect(() => {
    const categoriesWithWidth = addWidths(categoriesWithPosition, categoryRefs);
    categoriesWithWidth.forEach((category) => {
      // console.log(
      //   "name",
      //   category.name,
      //   "position",
      //   category.position,
      //   "width",
      //   category.descendantWidth
      // );
    });
  }, [categoryRefs]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {Array.from(categories.values()).map((category, index) => (
          <Category
            name={category.name}
            key={index}
            centerX={100}
            centerY={100}
            ref={(el) => {
              if (el !== null) {
                categoryRefs.current.set(category.id, el);
              }
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
