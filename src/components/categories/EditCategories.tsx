import { useEffect, useRef } from "react";

import Tree from "./Tree";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import useReload from "@/hooks/useReload";
import { requestCategories } from "@/redux/slices/categories/categoriesActions";
import { createCategoryMap, formatMapCategories } from "@/utils/categories";

const EditCategories = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(requestCategories());
  }, [dispatch]);

  const refTree = useRef<Map<number, HTMLDivElement>>(new Map());
  const { categories, categoriesEditHash } = useAppSelector(
    (state) => state.categories
  );
  const categoriesMap = createCategoryMap(categories);
  const tree = formatMapCategories(categoriesMap, refTree);

  const reload = useReload(categoriesEditHash);

  if (reload) {
    return <div></div>;
  }

  return (
    <div className="flex gap-3">
      {tree.map((child, index) => {
        return (
          <Tree
            id={child.id}
            key={index}
            name={child.name}
            treeChildren={child.treeChildren}
            refs={refTree}
          />
        );
      })}
    </div>
  );
};

export default EditCategories;
