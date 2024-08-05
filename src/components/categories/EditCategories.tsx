import { type MutableRefObject, useRef } from "react";

import ArrowBetweenDivs from "./ArrowBetweenDivs";
import Tree, { type TreeProps } from "./Tree";

import {
  categoriesWithPosition,
  type CategoryWithPosition,
} from "@/utils/categories";
console.log("🚀 - categoriesWithPosition:", categoriesWithPosition);

const formatMapCategories = (
  categories: Map<number, CategoryWithPosition>,
  refs: MutableRefObject<Map<number, HTMLDivElement>>
): TreeProps[] => {
  const buildTree = (category: CategoryWithPosition): TreeProps => {
    const children = category.childrenIds.map((childId): TreeProps => {
      const child = categories.get(childId);
      if (child === undefined) {
        console.error(`Category with id ${childId} not found`);
        return { name: "Category not found", id: -1, refs };
      }
      return buildTree(child);
    });

    return {
      refs,
      id: category.id,
      name: category.name,
      treeChildren: children,
    };
  };

  const tree = Array.from(categories.values())
    .filter((category) => category.parentId === undefined)
    .map((category) => buildTree(category));

  return tree;
};

const EditCategories = (): JSX.Element => {
  const refTree = useRef<Map<number, HTMLDivElement>>(new Map());

  const tree = formatMapCategories(categoriesWithPosition, refTree);

  return (
    <div className="flex gap-3">
      {/* {tree.map((child, index) => {
        return (
          <Tree
            id={child.id}
            key={index}
            name={child.name}
            treeChildren={child.treeChildren}
            refs={refTree}
          />
        );
      })} */}
      <ArrowBetweenDivs />
    </div>
  );
};

export default EditCategories;
