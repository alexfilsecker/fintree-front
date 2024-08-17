import { type MutableRefObject } from "react";

import { type TreeProps } from "@/components/categories/Tree";
import {
  type Category,
  type CategoryApiResponse,
} from "@/redux/slices/categories/categoriesSlice";

export type CategoryWithChildrenIds = CategoryApiResponse & {
  childrenIds: number[];
};

export const createCategoryMap = (
  categories: Record<number, CategoryApiResponse>
): Map<number, CategoryWithChildrenIds> => {
  const categoriesWithChildren = new Map<number, CategoryWithChildrenIds>();

  // This is O(N^2) but it's fine because the number of categories is small
  // Should be refactored if the number of categories grows
  Object.values(categories).forEach((category) => {
    const childrenIds = Object.values(categories)
      .filter((child) => child.parentCategoryId === category.id)
      .map((child) => child.id);
    const categoryWithChildren = {
      ...category,
      childrenIds,
    };
    categoriesWithChildren.set(category.id, categoryWithChildren);
  });

  return categoriesWithChildren;
};

export const formatMapCategories = (
  categories: Map<number, CategoryWithChildrenIds>,
  refs: MutableRefObject<Map<number, HTMLDivElement>>
): TreeProps[] => {
  const buildTree = (category: CategoryWithChildrenIds): TreeProps => {
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
    .filter((category) => category.parentCategoryId === null)
    .map((category) => buildTree(category));

  return tree;
};

export const getNonDescendantCategories = (
  categories: Record<number, Category>,
  ancestorId: number
): Category[] => {
  const isDescendant = (category: Category, ancestorId: number): boolean => {
    if (category.id === ancestorId) {
      return true;
    }
    if (category.parentCategoryId === null) {
      return false;
    }
    return isDescendant(categories[category.parentCategoryId], ancestorId);
  };

  return Object.values(categories).filter(
    (category) => !isDescendant(category, ancestorId)
  );
};
